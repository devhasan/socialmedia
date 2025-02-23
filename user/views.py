from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def userInfo(request):
    return HttpResponse('<h1>Hello! This is User Details page of Admin panel</h1>')