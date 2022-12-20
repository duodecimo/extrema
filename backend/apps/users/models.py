from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

from .managers import UserManager

AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google', 'email': 'email'}

class User(AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(_('name'), max_length=250)
    is_verified = models.BooleanField(_('is_verified'), default=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('is active'), default=True)
    is_superuser = models.BooleanField(_('is superuser'), default=False)
    is_staff = models.BooleanField(_('is staff'), default=False)
    auth_provider = models.CharField(max_length=255,
                                     blank=False,
                                     null=False,
                                     default=AUTH_PROVIDERS.get('email'))

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'name': self.name,
            'email': self.email,
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

