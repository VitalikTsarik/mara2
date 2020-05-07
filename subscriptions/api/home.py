from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from subscriptions.models import Subscription
from subscriptions.serializers import ListSubscriptionsSerializer

RECENT_SUBSCRIPTIONS_COUNT = 10


class HomeView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ListSubscriptionsSerializer

    def get(self, request, *args, **kwargs):
        subscriptions = Subscription.objects.order_by('-subscription_date')[:RECENT_SUBSCRIPTIONS_COUNT]
        serializer = self.serializer_class(subscriptions, many=True)
        data = {
            'subscriptions': serializer.data,
        }
        return Response(data)
