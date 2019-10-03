from django.db import models

from .watchable import Watchable


class TvShow(Watchable):
    seasons = models.PositiveSmallIntegerField()
    years = models.CharField(max_length=9, default=None)
    is_airing = models.BooleanField(default=False)

    def __str__(self):
        return f'{super().__str__()} {self.seasons}'
