from django.db import models
from polymorphic.managers import PolymorphicQuerySet

from ..subscribable import Subscribable


class WatchableQuerySet(PolymorphicQuerySet):
    def get(self, *args, **kwargs):
        for cls in Watchable.__subclasses__():
            try:
                return cls.objects.get(*args, **kwargs)
            except cls.DoesNotExist:
                continue
        raise Watchable.DoesNotExist


class Watchable(Subscribable):
    manager = WatchableQuerySet.as_manager()
    imdb_id = models.PositiveIntegerField(default=0, unique=True)
    title = models.CharField(max_length=100)
    runtime = models.DurationField(blank=True, null=True)
    genres = models.CharField(max_length=50, default='', blank=True)
    year = models.CharField(max_length=4, default='')
    preview_poster_url = models.URLField(blank=True, default='')
    poster_url = models.URLField(blank=True, default='')

    def __str__(self):
        return f'{self.imdb_id} {self.title}'

    class Meta:
        abstract = True
