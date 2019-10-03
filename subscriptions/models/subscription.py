from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from subscriptions.models.content.subscribable import Subscribable


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_id = models.ForeignKey(Subscribable, on_delete=models.DO_NOTHING)
    subscription_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user}, {self.content_id}'
