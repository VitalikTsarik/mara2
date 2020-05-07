from huey import crontab
from huey.contrib.djhuey import task, db_periodic_task

from ..helpers.mail import send_subscriptions_update
from ..models import Subscription


def subscriptions_check(user):
    subscriptions = Subscription.objects.filter(user=user)

    items = []
    for subscription in subscriptions:
        if subscription.updated:
            items.append(subscription.content.get_real_instance())
        subscription.updated = False
        subscription.save()

    if len(items):
        send_subscriptions_update(user.email, user.username, items)


@task()
def schedule_subscriptions_check(user, minutes='0', hours='12'):
    def wrapper():
        subscriptions_check(user)

    schedule = crontab(minute=minutes, hour=hours)
    task_name = f'user_{user.id}_subscriptions'

    db_periodic_task(schedule, name=task_name)(wrapper)
