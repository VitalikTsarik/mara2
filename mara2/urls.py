from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include

from users import views as user_views

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('subscriptions.urls')),
    path('admin/', admin.site.urls),
    # path('', include('subscriptions.urls')),
    # path('registration/', user_views.RegistrationView.as_view(), name='registration'),
    # path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    # path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
]
