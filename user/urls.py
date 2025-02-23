from django.urls import path
from . import views

urlpatterns = [
     path('admin/users/', views.userInfo)
]
