from django.urls import path
from . import views

urlpatterns = [
    path('blog/', views.blog, name='blog'),
    path('blogdetails/<int:id>', views.blogdetails, name='blogdetails'),
    path('createpost/', views.createpost, name='createpost'),
    path('updatepost/<int:id>', views.updatepost, name='updatepost'),
    path('deletepost/<int:id>', views.deletepost, name='deletepost'),
]