from django.db import models
from polymorphic.models import PolymorphicModel


class Subscribable(PolymorphicModel):
    content_id = models.BigAutoField(primary_key=True)
