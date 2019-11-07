from django.db import models

from ..subscribable import Subscribable


class Watchable(Subscribable):
    imdb_id = models.PositiveIntegerField(default=0, db_index=True)
    title = models.CharField(max_length=100)
    runtime = models.DurationField()
    genres = models.CharField(max_length=50, default=None)
    year = models.CharField(max_length=4, default=None)
    poster_url = models.URLField(default='#')

    def __str__(self):
        return f'{self.imdb_id} {self.title}'

    class Meta:
        abstract = True
