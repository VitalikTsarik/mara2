from rest_framework import serializers

from .models import TvShow


class TvShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = TvShow
        fields = '__all__'
