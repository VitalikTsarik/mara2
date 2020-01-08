from django.urls import path
from knox.views import LogoutView

from .api import RegisterView, LoginView, UserView

# TODO: for multi device authorization use buildin LoginView from knox.views
urlpatterns = [
    path('api/register/', RegisterView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/logout/', LogoutView.as_view()),
    path('api/user/', UserView.as_view()),
]
