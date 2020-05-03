from rest_framework.serializers import ModelSerializer
from rest_polymorphic.serializers import PolymorphicSerializer

from .models import TvShow, Subscription, Movie


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


class MovieDetailSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'poster_url',
            'runtime',
            'genres',
            'year',
        )


class TitleDetailSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Movie: MovieDetailSerializer,
        TvShow: TvShowDetailSerializer,
    }


class TvShowPreviewSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'poster_url',
        )


class MoviePreviewSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'poster_url',
        )


class TitlePreviewSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Movie: MoviePreviewSerializer,
        TvShow: TvShowPreviewSerializer,
    }


class SubscriptionsSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            'user',
            'content',
            'subscription_date'
        )


class RecentSubscriptionsSerializer(ModelSerializer):
    content = TitlePreviewSerializer()

    class Meta:
        model = Subscription
        fields = (
            'content',
            'subscription_date'
        )


class TvShowSearchSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'seasons',
            'poster_url',
            'runtime',
            'genres',
        )


class MovieSearchSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'poster_url',
            'runtime',
            'genres',
        )


class TitleSearchSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Movie: MovieSearchSerializer,
        TvShow: TvShowSearchSerializer,
    }
