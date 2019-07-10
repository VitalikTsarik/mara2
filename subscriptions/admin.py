from django.contrib import admin

from .models.content.tv_show import TvShow
from .models.subscription import Subscription

admin.site.register(Subscription)
admin.site.register(TvShow)
