from django.urls import include, path
from rest_framework import routers

from apps.movies.views import MovieViewSet, MovieSessionViewSet

router = routers.DefaultRouter()
router.register(r"movies", MovieViewSet)
router.register(r"movieSessions", MovieSessionViewSet)

urlpatterns = [
    path("", include(router.urls), name="movies"),
]
