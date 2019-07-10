from django.db import models

from subscriptions.models.content.watchable import Watchable


class TvShow(Watchable):
    seasons = models.PositiveSmallIntegerField()
    years = models.CharField(max_length=9, default=None)
    # is_airing = models.BooleanField()
