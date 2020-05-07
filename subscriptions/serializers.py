from rest_framework.serializers import ModelSerializer, DateTimeField
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


class TvShowSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'poster_url',
        )


class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'poster_url',
        )


class TitleSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Movie: MovieSerializer,
        TvShow: TvShowSerializer,
    }


class TvShowPreviewSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'preview_poster_url',
        )


class MoviePreviewSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'preview_poster_url',
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


class ListSubscriptionsSerializer(ModelSerializer):
    content = TitlePreviewSerializer()
    subscription_date = DateTimeField(format="%H:%M %d-%b-%y", required=False, read_only=True)

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
