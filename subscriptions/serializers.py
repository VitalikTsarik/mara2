from rest_framework.serializers import ModelSerializer

from .models import TvShow, Subscription


class TvShowDetailSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'poster_url',
            'seasons',
            'runtime',
            'genres',
            'year',
            'years',
            'is_airing',
        )


class TvShowPreviewSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'preview_poster_url',
            'is_airing',
        )


class SubscriptionsSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            'user',
            'content',
            'subscription_date'
        )
