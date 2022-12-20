from django.urls import include, path
from rest_framework import routers

from apps.movies.views import MovieViewSet

router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet)

urlpatterns = [
    path('', include(router.urls), name='movies'),
]
