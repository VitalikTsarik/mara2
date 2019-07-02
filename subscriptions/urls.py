from django.urls import path

from subscriptions.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
