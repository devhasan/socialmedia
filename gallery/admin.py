from django.contrib import admin
from .models import Comment, MediaFile

# Register your models here.
admin.site.register(MediaFile)
admin.site.register(Comment)
