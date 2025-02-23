from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def customer(request):
    return HttpResponse("<h1>Hello, Welcome to customer page!</h1>")

def customerDetails(request):
    return HttpResponse("<h1>Hello, This is Customer Details page</h1>")

def contact(request):
    return HttpResponse("Contact Page")