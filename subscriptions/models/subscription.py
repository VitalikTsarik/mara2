from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    imdb_id = models.CharField(max_length=10)
    last_season = models.PositiveSmallIntegerField()
    subscription_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'<Subscription: {self.user}, {self.imdb_id}, {self.last_season}>'
