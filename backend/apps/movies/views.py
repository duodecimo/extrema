from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet

from apps.movies.models import Movie, MovieSession
from apps.movies.serializers import MovieSerializer, MovieSessionSerializer


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]


class MovieSessionViewSet(ModelViewSet):
    queryset = MovieSession.objects.all()
    serializer_class = MovieSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
