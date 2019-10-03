from django.contrib import admin

from .models import Movie
from .models import TvShow
from .models import Subscription

admin.site.register(Subscription)
admin.site.register(TvShow)
admin.site.register(Movie)
