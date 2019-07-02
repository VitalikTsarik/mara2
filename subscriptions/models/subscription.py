from django.contrib.auth.models import User
from django.db import models


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    imdb_id = models.CharField(max_length=10)
    last_season = models.PositiveSmallIntegerField()

    def __str__(self):
        return '<Subscription: {}, {}, {}>'.format(self.user, self.imdb_id, self.last_season)
