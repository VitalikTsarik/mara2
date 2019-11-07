from django.db import models
from polymorphic.managers import PolymorphicManager

from .watchable import Watchable


class ImdbManager(PolymorphicManager):
    def get_or_fetch(self, imdb_id):
        try:
            return self.get(imdb_id=imdb_id)
        except TvShow.DoesNotExist:
            from imdb_utils.db_fetch import ImdbConnection

            connection = ImdbConnection()
            connection.connect()

            tv_show = connection.fetch_tv_show_by_id(imdb_id)

            if tv_show:
                tv_show.save()
            return tv_show


class TvShow(Watchable):
    objects = ImdbManager()
    seasons = models.PositiveSmallIntegerField()
    years = models.CharField(max_length=9, default=None)
    is_airing = models.BooleanField(default=False)

    def __str__(self):
        return f'Tv Show {self.title} {self.imdb_id} {self.content_id}'

