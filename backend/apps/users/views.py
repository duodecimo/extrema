import logging
import os

import jwt
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils.encoding import (
    DjangoUnicodeDecodeError,
    force_str,
    smart_bytes,
    smart_str,
)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    AdminUserSerializer,
    EmailVerificationSerializer,
    LoginSerializer,
    LogoutSerializer,
    RegisterSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UserEmailCheckSerializer,
    UserSerializer,
)
from .utils import Util

logger = logging.getLogger("apps")


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get("APP_SCHEME"), "http", "https"]


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):
        logger.info(
            "Em apps/users/views.py - RegisterView - post - user:  %s" % (request.data)
        )
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=False):
            logger.info(
                "Em apps/users/views.py - RegisterView - post - serializer is valid!"
            )
            serializer.save()
            user_data = serializer.data
            user = User.objects.get(email=user_data["email"])
        else:
            logger.info(
                "Em apps/users/views.py - RegisterView - post - serializer IS NOT valid!"
            )
            logger.info(
                "Em apps/users/views.py - RegisterView - user['email']:  %s"
                % (user["email"])
            )
            user = User.objects.get(email=user["email"])
            if user.is_verified:
                return Response("Usuário já existente", status=status.HTTP_409_CONFLICT)
            user_data = {
                "email": user.email,
                "name": user.name,
            }

        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse("email-verify")
        absurl = "http://" + current_site + relativeLink + "?token=" + str(token)
        email_body = (
            "Olá, "
            + user.name
            + " , use o link abaixo para verificar seu email junto ao site Extrema \n"
            + absurl
        )
        data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Verifique seu email",
        }

        # debugging = os.environ.get('DEBUG') or True
        debugging = True
        if debugging == True:
            logger.info(
                "In authentication.views, RegisterView, post, sending email:  %s"
                % (email_body)
            )

        # need to register an email account
        # Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    # token_param_config = openapi.Parameter('token',
    #                                        in_=openapi.IN_QUERY,
    #                                        description='Description',
    #                                        type=openapi.TYPE_STRING)

    # @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        debugging = os.environ.get("DEBUG") or True
        if debugging == True:
            logger.info(
                "Em apps/user/views.py, VerifyEmail - SECRET_KEY: %s token: %s"
                % (settings.SECRET_KEY, token)
            )
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            # payload = jwt.decode(token, settings.SECRET_KEY, algorithm="HS256")
            user = User.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            # return Response({'email': 'Successfully activated'},
            #                 status=status.HTTP_200_OK)
            return render(
                request, "email_verify.html", {"mensagem": "Ativado com Successo!!!"}
            )
        except jwt.ExpiredSignatureError as identifier:
            # return Response({'error': 'Activation Expired'},
            #                 status=status.HTTP_400_BAD_REQUEST)
            return render(
                request, "email_verify.html", {"mensagem": "Ativação Expirada."}
            )
        except jwt.exceptions.DecodeError as identifier:
            if debugging == True:
                logger.info("Em apps/user/views.py, VerifyEmail: DecodeError ...")
                print("Em apps/user/views.py, VerifyEmail: DecodeError ...")
                print("Unverifyed header: ", jwt.get_unverified_header(token))
                print(
                    "claims without validation: ",
                    jwt.decode(token, options={"verify_signature": False}),
                )
            # return Response(,
            #                 status=status.HTTP_400_BAD_REQUEST)
            return render(
                request,
                "email_verify.html",
                {"mensagem": "Token de ativação inválido."},
            )


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get("email", "")

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                "password-reset-confirm", kwargs={"uidb64": uidb64, "token": token}
            )

            redirect_url = request.data.get("redirect_url", "")
            absurl = "http://" + current_site + relativeLink
            email_body = (
                "Alo, \n Use o link abaixo para resetar sua senha  \n"
                + absurl
                + "?redirect_url="
                + redirect_url
            )
            debugging = os.environ.get("DEBUG") or True
            if debugging == True:
                print("Corpo do email: ", email_body)
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Resetar sua senha",
            }
            Util.send_email(data)
        return Response(
            {"success": "We have sent you a link to reset your password"},
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get("redirect_url")

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url + "?token_valid=False")
                else:
                    return CustomRedirect(
                        os.environ.get("FRONTEND_URL", "") + "?token_valid=False"
                    )

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(
                    redirect_url
                    + "?token_valid=True&message=Credentials Valid&uidb64="
                    + uidb64
                    + "&token="
                    + token
                )
            else:
                return CustomRedirect(
                    os.environ.get("FRONTEND_URL", "") + "?token_valid=False"
                )

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url + "?token_valid=False")

            except UnboundLocalError as e:
                return Response(
                    {"error": "Token is not valid, please request a new one"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password reset success"},
            status=status.HTTP_200_OK,
        )


class LogoutAPIView(generics.GenericAPIView):
    """
    conforme explicado em:
    https://django-rest-framework-simplejwt.readthedocs.io/en/latest/blacklist_app.htm
    para o logout funcionar, é preciso adicionar rest_framework_simplejwt.token_blacklist
    em settings.py>INSTALLED_APPS e em seguida rodar python manage.py migrate.
    Uma observação, o token access continua funcionando, vai parar quando expirar.
    O token refresh que vai para a blacklist. Ambos devem ser limpos, especialmente
    o de acesso, dos caches do frontend, na ocasião do logout.
    """

    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserEmailCheck(generics.GenericAPIView):

    # permission_classes=(permissions.IsAdminUser, )
    serializer_class = UserEmailCheckSerializer

    # @swagger_auto_schema(method='get',
    #                      manual_parameters=[
    #                          openapi.Parameter('email',
    #                                            openapi.IN_QUERY,
    #                                            description="filtro por email",
    #                                            required=True,
    #                                            type=openapi.TYPE_STRING)
    #                      ])
    @action(methods=["get"], detail=True)
    def get(self, request):
        # print("data: ", request.data['email'])
        # user = get_object_or_404(User, email=request.data['email'])
        email = request.query_params["email"]
        print("data: ", email)
        user = get_object_or_404(User, email=email)
        resultado = {"email": email, "is_verified": user.is_verified}
        return Response(resultado, status=status.HTTP_200_OK)


class AdminUserViewSet(generics.GenericAPIView):
    serializer_class = AdminUserSerializer

    # @swagger_auto_schema(method='patch',
    #                      manual_parameters=[
    #                          openapi.Parameter('user_id',
    #                                            openapi.IN_QUERY,
    #                                            description="Id do usuário",
    #                                            type=openapi.TYPE_STRING),
    #                      ])
    @action(methods=["patch"], detail=True)
    def patch(self, request):
        user_id = request.query_params["user_id"]
        user = User.objects.get(id=user_id)

        if request.user == "AnonymousUser":
            return Response("You are not logged", status=status.HTTP_400_BAD_REQUEST)
        elif request.user.is_superuser:
            print("USER", user, user.is_staff)
            user.is_staff = True
            user.save()
            result = {
                "email": user.email,
                "name": user.name,
                "is_staff": user.is_staff,
                "status": "staff updated",
                "message": f"you are a superuser and {user.name} is admin now",
            }

            return Response(result, status=status.HTTP_200_OK)

        elif request.user.is_staff:
            result = {
                "email": user.email,
                "name": user.name,
                "is_staff": user.is_staff,
                "status": "staff read",
                "message": f"you are an admin and {user.name} is admin too",
            }
            return Response(result, status=status.HTTP_206_PARTIAL_CONTENT)
        elif request.user.is_active:
            if request.user.is_verified:
                result = {"message": "you are a user"}
                return Response(result, status=status.HTTP_401_UNAUTHORIZED)
            else:
                result = {"message": "you are a user and not verified"}
                return Response(result, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(
                {"Error": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST
            )
