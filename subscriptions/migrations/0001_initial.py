# Generated by Django 3.0.3 on 2020-05-07 20:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscribable',
            fields=[
                ('content_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('polymorphic_ctype', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_subscriptions.subscribable_set+', to='contenttypes.ContentType')),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('subscribable_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='subscriptions.Subscribable')),
                ('imdb_id', models.PositiveIntegerField(default=0, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('runtime', models.DurationField(blank=True, null=True)),
                ('genres', models.CharField(blank=True, default='', max_length=50)),
                ('year', models.CharField(default='', max_length=4)),
                ('preview_poster_url', models.URLField(blank=True, default='')),
                ('poster_url', models.URLField(blank=True, default='')),
            ],
            options={
                'abstract': False,
            },
            bases=('subscriptions.subscribable',),
            managers=[
                ('titles', django.db.models.manager.Manager()),
                ('objects', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='TvShow',
            fields=[
                ('subscribable_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='subscriptions.Subscribable')),
                ('imdb_id', models.PositiveIntegerField(default=0, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('runtime', models.DurationField(blank=True, null=True)),
                ('genres', models.CharField(blank=True, default='', max_length=50)),
                ('year', models.CharField(default='', max_length=4)),
                ('preview_poster_url', models.URLField(blank=True, default='')),
                ('poster_url', models.URLField(blank=True, default='')),
                ('seasons', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('years', models.CharField(blank=True, default='', max_length=9)),
            ],
            options={
                'abstract': False,
            },
            bases=('subscriptions.subscribable',),
            managers=[
                ('titles', django.db.models.manager.Manager()),
                ('objects', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscription_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.BooleanField(default=False)),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='subscriptions.Subscribable')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
