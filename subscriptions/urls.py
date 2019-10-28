from rest_framework.routers import DefaultRouter

from .views.search import Search
from .views.my_list import MyListView
from .views.subscribe import subscribe
from .views.tv_show_detail import TvShowDetailView

from .api import TvShowViewSet

router = DefaultRouter()
router.register('api/subscriptions', TvShowViewSet)

urlpatterns = router.urls

#     [
#     path('my_list/', MyListView.as_view(), name='my_list'),
#     path('tv_show/<int:pk>', TvShowDetailView.as_view(), name='tv_show'),
#     path('search/<search_input>', Search.as_view(), name='search'),
#     path('subscribe/<int:tv_show_pk>', subscribe, name='subscribe'),
# ]
