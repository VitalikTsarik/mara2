from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from subscriptions.models import TvShow
from subscriptions.serializers import TvShowDetailSerializer


class TvShowViewSet(ReadOnlyModelViewSet):
    queryset = TvShow.objects.all()
    serializer_class = TvShowDetailSerializer
    lookup_url_kwarg = 'imdb_id'

    def retrieve(self, request, imdb_id=None, *args, **kwargs):
        tv_show = TvShow.objects.get_or_fetch(imdb_id)
        serializer = self.serializer_class(tv_show)
        return Response(serializer.data)
