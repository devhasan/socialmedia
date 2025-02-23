from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def domain(request):
    return render(request, 'service/domain.html')

def hosting(request):
    return render(request, 'service/hosting.html')