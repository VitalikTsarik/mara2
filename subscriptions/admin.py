from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from knox.auth import User

from .models import Movie
from .models import TvShow
from .models import Subscription
from .tasks import schedule_subscriptions_check

admin.site.register(Subscription)
admin.site.register(TvShow)
admin.site.register(Movie)


def schedule_check_action(admin, request, queryset):
    for user in queryset:
        schedule_subscriptions_check(user)


schedule_check_action.short_description = "Schedule subscriptions check"


class CustomUserAdmin(UserAdmin):
    actions = [schedule_check_action]


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
