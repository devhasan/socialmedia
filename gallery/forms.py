from django import forms
from .models import MediaFile, Comment

class MediaFileForm(forms.ModelForm):
    class Meta:
        model = MediaFile
        fields = ['title', 'description', 'file']
        widgets = {
            'title': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Title', 'required':True, 'autofocus':True}),
            'description': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Content', 'required':True}),            
            'file': forms.FileInput(attrs={'class':'form-control', 'type':'file', 'placeholder':'Image'}),
        }
        

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
        widgets = {
            'title': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Title', 'required':True, 'autofocus':True}),
        }