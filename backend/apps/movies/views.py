from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from apps.movies.models import Movie
from apps.movies.serializers import MovieSerializer


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]
