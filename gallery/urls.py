from django.urls import path
from . import views


#app_name = 'gallery'

urlpatterns = [
    path('gallery/', views.gallery, name='gallery'),
    path('gallerydetails/<int:id>', views.gallerydetails, name='gallerydetails'),
    path('gallerydetails/<int:id>/like', views.like_post, name='like_post'),
    path('upload/', views.upload_file, name='upload_file'),
    #path('updatepost/<int:id>', views.updatepost, name='updatepost'),
    #path('deletepost/<int:id>', views.deletepost, name='deletepost'),
]