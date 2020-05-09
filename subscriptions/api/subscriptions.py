import logging

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from subscriptions.models import Subscription, Movie
from subscriptions.serializers import SubscriptionsSerializer, TitleSerializer

logger = logging.getLogger(__name__)


class SubscriptionsViewSet(ModelViewSet):
    queryset = Subscription.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionsSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-subscription_date')

    def list(self, request, *args, **kwargs):
        subscriptions = self.filter_queryset(self.get_queryset())

        titles = []
        for sub in subscriptions:
            titles.append(Movie.titles.get(imdb_id=sub.content.imdb_id))

        serializer = TitleSerializer(titles, many=True)
        return Response(serializer.data)


class SubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, content_id=None, *args, **kwargs):
        subscription = Subscription(user=self.request.user, content_id=content_id)
        subscription.save()
        return Response(status=HTTP_200_OK)


class UnsubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, content_id=None, *args, **kwargs):
        try:
            subscription = Subscription.objects.get(user=self.request.user, content_id=content_id)
            subscription.delete()
        except Subscription.DoesNotExist:
            logger.warning(
                f'Trying to delete nonexistent subscription. User id: {request.user.id}, Content id: {content_id}')
            Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=HTTP_200_OK)
