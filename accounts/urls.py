from django.urls import path
from knox.views import LogoutView

from .api import RegisterView, LoginView, UserView

# TODO: for multi device authorization use buildin LoginView from knox.views
urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user/', UserView.as_view()),
]
