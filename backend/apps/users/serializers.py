from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):

    """
    quando criando ou atualizando o usuário, se existir um valor
    para a password, o valor deve ser codifificado.
    a função make-password(password) é adequada para isso.
    """

    def create(self, validated_data):
        if "password" in validated_data:
            print("<<<< validated_data (with password): ", validated_data)
            password = validated_data.get("password", None)
            print("<<< password: ", password)
            # Turn a plain-text password into a hash for database storage
            password = make_password(password)
            print(">>> password: ", password)
            # remove password key/value pair from dict
            validated_data.pop("password")
            # add key/value pair with new password value
            user = User(password=password, **validated_data)
        else:
            user = User(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        print("<<<< validated_data: ", validated_data)

        for key, value in validated_data.items():
            if key == "password":
                print("<<< password: ", value)
                password = make_password(value)
                print(">>> password: ", password)
                instance.password = password
            else:
                setattr(instance, key, value)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = "__all__"


# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    default_error_messages = {
        "name": "The name should only contain alphanumeric characters"
    }

    class Meta:
        model = User
        fields = ["email", "name", "password"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        name = attrs.get("name", "")
        print(
            ">>> In apps.users.serializers.RegisterSerializer - validate - email: ",
            email,
            " name: ",
            name,
            " attrs: ",
            attrs,
        )

        # Problema na função. Por exemplo, espaço (no nome) não é alnum ...
        # if not name.isalnum():
        #     print(
        #         ">>> In apps.users.serializers.RegisterSerializer - validate - name is NOT alnum! "
        #     )
        #     raise serializers.ValidationError(self.default_error_messages)
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ["token"]


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    name = serializers.CharField(max_length=255, min_length=3, read_only=True)
    user_status = serializers.SerializerMethodField()
    userid = serializers.SerializerMethodField()
    tokens = serializers.SerializerMethodField()
    provider = serializers.SerializerMethodField()
    is_active = serializers.BooleanField(default=True, required=False)

    @extend_schema_field(OpenApiTypes.STR)
    def get_user_status(self, obj):
        user = User.objects.get(email=obj["email"])
        return (
            "superuser" if user.is_superuser else "admin" if user.is_staff else "normal"
        )

    @extend_schema_field(OpenApiTypes.INT)
    def get_userid(self, obj):
        user = User.objects.get(email=obj["email"])
        return user.id

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_tokens(self, obj):
        user = User.objects.get(email=obj["email"])

        return {"refresh": user.tokens()["refresh"], "access": user.tokens()["access"]}

    @extend_schema_field(OpenApiTypes.STR)
    def get_provider(self, obj):
        user = User.objects.get(email=obj["email"])
        return user.auth_provider

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "name",
            "user_status",
            "userid",
            "provider",
            "tokens",
            "is_active",
        ]

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")
        filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)

        if (
            filtered_user_by_email.exists()
            and filtered_user_by_email[0].auth_provider != "email"
        ):
            raise AuthenticationFailed(
                detail="Please continue your login using "
                + filtered_user_by_email[0].auth_provider
            )

        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        return {
            "userid": user.id,
            "email": user.email,
            "name": user.name,
            "provider": user.auth_provider,
            "tokens": user.tokens,
        }

        # return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid", 401)
        # return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {"bad_token": ("Token is expired or invalid")}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail("bad_token")


class UserEmailCheckSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = "__all__"


class AdminUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    is_staff = serializers.BooleanField()
    status = serializers.CharField()
    message = serializers.CharField()

    class Meta:
        fields = "__all__"
