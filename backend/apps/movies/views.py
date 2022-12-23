from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet

from apps.movies.models import Movie
from apps.movies.serializers import MovieSerializer


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = []
