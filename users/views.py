from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.views.generic import FormView

from users.forms import RegistrationForm


class RegistrationView(FormView):
    form_class = RegistrationForm
    template_name = 'users/registration.html'

    def form_valid(self, form):
        form.save()
        username = form.cleaned_data['username']
        user = authenticate(username=username, password=form.cleaned_data['password1'])
        login(self.request, user)
        messages.success(self.request, f'Account created for {username}!')
        return redirect('index')
