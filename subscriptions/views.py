from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView
from django.views.generic.edit import ProcessFormView

from .models import Subscription, TvShow
from .imdb.utils import get_tv_show_by_imdb_id


@method_decorator(login_required, name='dispatch')
class MyListView(ListView):
    model = Subscription
    context_object_name = 'subscriptions'
    template_name = 'subscriptions/my_list.html'

    def get_queryset(self):
        subscriptions = Subscription.objects.filter(user=self.request.user).order_by('-subscription_date')
        return [TvShow.objects.get(imdb_id=sub.imdb_id) for sub in subscriptions]


class TvShowDetailView(DetailView, ProcessFormView):
    model = TvShow
    context_object_name = 'tv_show'
    template_name = 'subscriptions/tv_show_detail.html'


def search_view(request):
    if request.method == 'POST':
        search_input = request.POST.get('search_input')
        print(search_input)
        return redirect('home')
    return render(request, 'home.html')


def subscribe(request, tv_show_pk):
    tv_show, created = TvShow.objects.get_or_create(imdb_id=tv_show_pk,
                                                    defaults=get_tv_show_by_imdb_id(tv_show_pk).__dict__)

    Subscription.objects.create(user=request.user, imdb_id=tv_show_pk, last_season=tv_show.seasons)
    return redirect(f'/tv_show/{tv_show_pk}')
