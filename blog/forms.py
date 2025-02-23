from django.forms import ModelForm
from django import forms
from .models import Post


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'category', 'tag', 'image', 'publish_at']
        widgets = {
            'title': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Title', 'required':True, 'autofocus':True}),
            'content': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Content', 'required':True}),
            'category': forms.SelectMultiple(attrs={'class':'form-select', 'size':'5', 'aria-label':'Multiple select example', 'placeholder':'Category'}),
            'tag': forms.SelectMultiple(attrs={'class':'form-control', 'placeholder':'Tag'}),
            'image': forms.FileInput(attrs={'class':'form-control', 'type':'file', 'placeholder':'Image'}),
            'publish_at': forms.DateTimeInput(attrs={'class':'form-control','type':'datetime-local', 'placeholder':'Publish At'}),
        }      