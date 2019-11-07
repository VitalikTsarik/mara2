from rest_framework import serializers

from .models import TvShow, Subscription


class TvShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = TvShow
        fields = ('content_id', 'title', 'poster_url', 'seasons', )


class SubscriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
