from django.db import models

from .watchable import Watchable


class TvShow(Watchable):
    seasons = models.PositiveSmallIntegerField(blank=True, null=True)
    years = models.CharField(max_length=9, default='', blank=True)
    is_airing = models.BooleanField(default=False)

    def is_updated(self, prev):
        return prev.seasons < self.seasons

    def __str__(self):
        return f'Tv Show {super().__str__()}'
