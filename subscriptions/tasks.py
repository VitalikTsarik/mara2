from huey import crontab
from huey.contrib.djhuey import task, db_periodic_task

from .models import Subscription


def subscriptions_check(user_id):
    subscriptions = Subscription.objects.filter(user_id=user_id)
    for subscription in subscriptions:
        print(f'{subscription.user.username} {subscription.content.title} checked')


@task()
def schedule_subscriptions_check(user_id, minutes='*/1', hours='*'):
    def wrapper():
        subscriptions_check(user_id)

    schedule = crontab(minute=minutes, hour=hours)
    task_name = f'user_{user_id}_subscriptions'

    db_periodic_task(schedule, name=task_name)(wrapper)
