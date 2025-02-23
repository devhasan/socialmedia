from django.db import models
from django.contrib.auth.models import User
from django.core.files import File

# Create your models here.
class MediaFile(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True)
    file = models.FileField(upload_to='uploads/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='media_files')
    view_count = models.PositiveBigIntegerField(default=0)
    liked_users = models.ManyToManyField(User, related_name='liked_posts')
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    post = models.ForeignKey(MediaFile, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.content