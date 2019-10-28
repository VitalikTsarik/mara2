from rest_framework import viewsets, permissions

from .models import TvShow
from .serializers import TvShowSerializer


class TvShowViewSet(viewsets.ModelViewSet):
    queryset = TvShow.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TvShowSerializer
