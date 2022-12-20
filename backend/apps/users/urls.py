
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (AdminUserViewSet, LoginAPIView, LogoutAPIView,
                    PasswordTokenCheckAPI, RegisterView,
                    RequestPasswordResetEmail, SetNewPasswordAPIView,
                    UserEmailCheck, UserViewSet, VerifyEmail)

# from .views import UserViewSet
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls), name='users'),
    path('admin/', admin.site.urls),
    path('access/register/', RegisterView.as_view(), name="register"),
    path('access/login/', LoginAPIView.as_view(), name="login"),
    path('access/logout/', LogoutAPIView.as_view(), name="logout"),
    path('sys_admin/email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('sys_admin/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sys_admin/request-reset-email/',
         RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('sys_admin/password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(),
         name='password-reset-confirm'),
    path('sys_admin/password-reset-complete/',
         SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),
    path('sys_admin/user-email-check/', UserEmailCheck.as_view(), name="user-email-check"),
    path('sys_admin/admin-user-check/',
         AdminUserViewSet.as_view(), name="admin-user-check"),
]