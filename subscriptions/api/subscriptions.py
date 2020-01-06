from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK

from subscriptions.models import Subscription, TvShow
from subscriptions.serializers import SubscriptionsSerializer, TvShowPreviewSerializer


class SubscriptionsViewSet(ModelViewSet):
    queryset = Subscription.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionsSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-subscription_date')

    def list(self, request, *args, **kwargs):
        subscriptions = self.filter_queryset(self.get_queryset())

        tv_shows = []
        for sub in subscriptions:
            tv_shows.append(TvShow.objects.get(imdb_id=sub.content.imdb_id))

        serializer = TvShowPreviewSerializer(tv_shows, many=True)
        return Response(serializer.data)


class SubscribeView(APIView):
    queryset = Subscription.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request, content_id=None, *args, **kwargs):
        self.subscribe_unsubscribe(content_id)
        return Response(status=HTTP_200_OK)

    def subscribe_unsubscribe(self, content_id):
        try:
            subscription = Subscription.objects.get(user=self.request.user, content_id=content_id)
            subscription.delete()
        except Subscription.DoesNotExist:
            subscription = Subscription(user=self.request.user, content_id=content_id)
            subscription.save()
