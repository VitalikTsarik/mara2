from rest_framework.routers import DefaultRouter

from .api import TvShowViewSet, TvShowImdbViewSet, SubscriptionsViewSet

router = DefaultRouter()
router.register('api/tv_show/imdb', TvShowImdbViewSet)
router.register('api/tv_show', TvShowViewSet)
router.register('api/subscriptions', SubscriptionsViewSet)

urlpatterns = router.urls
