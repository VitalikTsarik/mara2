from rest_framework.response import Response
from rest_framework.views import APIView
from subscriptions.models import Subscription
from subscriptions.serializers import RecentSubscriptionsSerializer

COUNT = 10


class RecentSubscriptionsView(APIView):
    serializer_class = RecentSubscriptionsSerializer

    def get(self, request, *args, **kwargs):
        subscriptions = Subscription.objects.order_by('-subscription_date')[:COUNT]
        serializer = self.serializer_class(subscriptions, many=True)
        data = {
            'subscriptions': serializer.data,
            'count': COUNT
        }
        return Response(data)
