from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api import TitleViewSet, SubscriptionsViewSet, SearchView, SubscribeView

router = DefaultRouter()
router.register('title', TitleViewSet)
router.register('subscriptions', SubscriptionsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('subscribe/<int:content_id>', SubscribeView.as_view()),
    path('search', SearchView.as_view()),
]
