from django.urls import path

from subscriptions.views import MyListView, TvShowDetailView, subscribe, search_view

urlpatterns = [
    path('my_list/', MyListView.as_view(), name='my_list'),
    path('tv_show/<int:pk>', TvShowDetailView.as_view(), name='tv_show'),
    path('search/', search_view, name='search'),
    path('subscribe/<int:tv_show_pk>', subscribe, name='subscribe'),
]
