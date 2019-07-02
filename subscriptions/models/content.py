from django.db import models


class Watchable(models.Model):
    title = models.CharField(max_length=100)
    runtime = models.DurationField()
    imdb_id = models.CharField(max_length=10)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class TvShow(Watchable):
    seasons_number = models.PositiveSmallIntegerField()
    is_airing = models.BooleanField

