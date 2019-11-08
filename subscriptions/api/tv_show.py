from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from subscriptions.models import TvShow
from subscriptions.serializers import TvShowDetailSerializer


class TvShowViewSet(ReadOnlyModelViewSet):
    queryset = TvShow.objects.all()
    serializer_class = TvShowDetailSerializer
    lookup_url_kwarg = 'content_id'

    def retrieve(self, request, content_id=None, *args, **kwargs):
        try:
            tv_show = TvShow.objects.get(content_id=content_id)
        except TvShow.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(tv_show)
        return Response(serializer.data)


class TvShowImdbViewSet(ReadOnlyModelViewSet):
    queryset = TvShow.objects.all()
    serializer_class = TvShowDetailSerializer
    lookup_url_kwarg = 'imdb_id'

    def retrieve(self, request, imdb_id=None, *args, **kwargs):
        tv_show = TvShow.objects.get_or_fetch(imdb_id)

        if tv_show is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(tv_show)
        return Response(serializer.data)


