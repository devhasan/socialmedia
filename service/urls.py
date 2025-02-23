from django.urls import path
from . import views

urlpatterns = [
    path('domain/', views.domain, name='domain'),
    path('hosting/', views.hosting, name='hosting'),
]