from django.shortcuts import render, redirect
from django.http import HttpResponse
from . import models
from django.contrib import messages
from django.urls import reverse_lazy
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def home(request):
    return render(request, 'website/index.html')

# def login(request):
#     return render(request, 'website/login.html')

def about(request):
    return HttpResponse("About Page")

def contact(request):
    return HttpResponse("Contact Page")

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data = request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                messages.add_message(request, messages.SUCCESS, 'Login Success')
                return redirect('home')
            else:
                messages.add_message(request, messages.ERROR, 'Invalid credentials')
    else:
        form = AuthenticationForm()
    return render(request, 'website/login.html', {'form': form})