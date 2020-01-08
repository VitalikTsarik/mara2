from django.urls import path, re_path

from .views import IndexView

urlpatterns = [
    path('', IndexView.as_view()),
    re_path(r'^(?:.*)/?$', IndexView.as_view()),
]
