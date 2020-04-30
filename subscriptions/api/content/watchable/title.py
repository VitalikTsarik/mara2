from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.viewsets import ReadOnlyModelViewSet

from subscriptions.models import TvShow, Subscription, Movie, Watchable
from subscriptions.serializers import TitleDetailSerializer


class TitleViewSet(ReadOnlyModelViewSet):
    queryset = Movie.titles.all()
    serializer_class = TitleDetailSerializer
    lookup_url_kwarg = 'content_id'

    def retrieve(self, request, content_id=None, *args, **kwargs):
        try:
            title = Movie.titles.get(content_id=content_id)
        except (Watchable.DoesNotExist, TvShow.DoesNotExist, Movie.DoesNotExist):
            return Response(status=HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(title)
        data = serializer.data

        if request.user.is_anonymous:
            data['is_subscribed'] = False
        else:
            data['is_subscribed'] = Subscription.objects.filter(user=request.user, content=title).exists()

        return Response(data)
