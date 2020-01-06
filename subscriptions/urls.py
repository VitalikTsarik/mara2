from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api import TvShowViewSet, TvShowImdbViewSet, SubscriptionsViewSet
from .api.subscriptions import SubscribeView

router = DefaultRouter()
router.register('api/tv_show/imdb', TvShowImdbViewSet)
router.register('api/tv_show', TvShowViewSet)
router.register('api/subscriptions', SubscriptionsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/subscribe/<int:content_id>', SubscribeView.as_view()),
]
