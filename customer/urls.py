from django.urls import path
from . import views

urlpatterns = [
    path('admin/customer/', views.customer),
    path('admin/customerDetails/', views.customerDetails),
    path('admin/contact/', views.contact),
]