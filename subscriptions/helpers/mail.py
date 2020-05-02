from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_subscriptions_update(recipient, username, items):
    subject = 'Your subscriptions update'
    html_message = render_to_string('mail/subscriptions_update.html', context={'username': username, 'items': items})
    plain_message = strip_tags(html_message)

    send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [recipient], html_message=html_message)
