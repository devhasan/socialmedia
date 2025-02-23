from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
import os
import datetime

def blog_directory_name(instance, filename):
    #print(instance.id, instance.title)
    return os.path.join('blog/media/', str(instance.title), filename)

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = [
        {'publish', 'Publish'},
        {'unpublish', 'Unpublish'},
    ]
    
    title = models.CharField(max_length=256)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, blank = True)
    tag = models.ManyToManyField(Tag, blank=True)
    image = models.ImageField(upload_to=blog_directory_name, null=True, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    publish_at = models.DateTimeField(default=datetime.datetime.now)
    
    def __str__(self):
        return self.title