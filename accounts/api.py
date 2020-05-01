from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from subscriptions.tasks import schedule_subscriptions_check
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterView(KnoxLoginView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        schedule_subscriptions_check(user.id)

        login(request, user)

        response = super().post(request)
        token = response.data['token']
        del response.data['token']

        response.set_cookie(
            'auth_token',
            token,
            samesite='strict',
        )
        return response


class LoginView(KnoxLoginView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)

        response = super().post(request)
        token = response.data['token']
        del response.data['token']

        response.set_cookie(
            'auth_token',
            token,
            samesite='strict',
        )
        return response


class UserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
