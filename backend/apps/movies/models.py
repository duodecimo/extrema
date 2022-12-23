from django.core.validators import MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.users.models import User

# Create your models here.


class Movie(models.Model):
    title = models.CharField(_("movie title"), max_length=50)
    is_active = models.BooleanField(_("is active"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    upload = models.FileField(_("upload"), upload_to="movies")


class MovieSession(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movies")
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name="users"
    )
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(null=True, blank=True)
    stars = models.PositiveSmallIntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
        ],
    )
