from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api import TvShowViewSet, TvShowImdbViewSet, SubscriptionsViewSet
from .api.subscriptions import SubscribeView

router = DefaultRouter()
router.register('tv_show/imdb', TvShowImdbViewSet)
router.register('tv_show', TvShowViewSet)
router.register('subscriptions', SubscriptionsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('subscribe/<int:content_id>', SubscribeView.as_view()),
]
