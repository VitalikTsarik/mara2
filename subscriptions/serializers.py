from rest_framework.serializers import ModelSerializer
from django.core.exceptions import ObjectDoesNotExist

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


class TitleDetailSerializer(ModelSerializer):
    def to_representation(self, instance):
        instance_class = instance.get_real_instance_class()
        if instance_class == Movie:
            return MovieDetailSerializer(instance=instance).data
        elif instance_class == TvShow:
            return TvShowDetailSerializer(instance=instance).data
        else:
            raise ObjectDoesNotExist(f'There is no fitting a serializer for instance of {instance_class} ')

    class Meta:
        model = None


class TvShowPreviewSerializer(ModelSerializer):
    class Meta:
        model = TvShow
        fields = (
            'content_id',
            'title',
            'poster_url',
            'is_airing',
        )


class MoviePreviewSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = (
            'content_id',
            'title',
            'poster_url',
        )


class TitlePreviewSerializer(ModelSerializer):
    def to_representation(self, instance):
        instance_class = instance.get_real_instance_class()
        if instance_class == Movie:
            return MoviePreviewSerializer(instance=instance).data
        elif instance_class == TvShow:
            return TvShowPreviewSerializer(instance=instance).data
        else:
            raise ObjectDoesNotExist(f'There is no fitting a serializer for instance of {instance_class} ')

    class Meta:
        model = None


class SubscriptionsSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            'user',
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


class TitleSearchSerializer(ModelSerializer):
    def to_representation(self, instance):
        instance_class = instance.get_real_instance_class()
        if instance_class == Movie:
            return MovieSearchSerializer(instance=instance).data
        elif instance_class == TvShow:
            return TvShowSearchSerializer(instance=instance).data
        else:
            raise ObjectDoesNotExist(f'There is no fitting a serializer for instance of {instance_class} ')

    class Meta:
        model = None
