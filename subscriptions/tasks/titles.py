from huey import crontab
from huey.contrib.djhuey import db_periodic_task

from imdb_utils.db_fetch import ImdbConnection
from ..models import Movie, Subscription


@db_periodic_task(crontab(minute='0', hour='0'))
def update_titles():
    connection = ImdbConnection()
    connection.connect()

    titles = Movie.titles.all()
    for old_title in titles:
        title = connection.fetch_title_by_id(old_title.imdb_id)
        title.content_id = old_title.content_id
        title.save()

        if title.is_updated(old_title):
            subscriptions = Subscription.objects.filter(content=title)
            for subscription in subscriptions:
                subscription.updated = True
                subscription.save()
