from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_serializer = UserSerializer(user, context=self.get_serializer_context())
        _, token = AuthToken.objects.create(user)

        return Response({
            'user': user_serializer.data,
            'token': token,
        })


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        user_serializer = UserSerializer(user, context=self.get_serializer_context())
        _, token = AuthToken.objects.create(user)

        return Response({
            'user': user_serializer.data,
            'token': token,
        })


class UserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
