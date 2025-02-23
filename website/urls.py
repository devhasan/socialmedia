from django.urls import path
#from . import views
from gallery import views

urlpatterns = [
    path('', views.gallery, name='home'),
    #path('admin/', views.login, name='login'),
    #path('about/', views.about, name='about'),
    #path('contact/', views.contact, name='contact'),
]