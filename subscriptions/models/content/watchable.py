from django.db import models


class Watchable(models.Model):
    title = models.CharField(max_length=100)
    runtime = models.DurationField()
    genres = models.CharField(max_length=50, default=None)
    year = models.CharField(max_length=4, default=None)
    imdb_id = models.PositiveIntegerField(primary_key=True)
    poster_url = models.URLField(default='#')

    class Meta:
        abstract = True

    def __str__(self):
        return self.title
