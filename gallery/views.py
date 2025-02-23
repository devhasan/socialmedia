from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import MediaFile, Comment
from .forms import MediaFileForm, CommentForm

# Create your views here.
# @login_required
# def gallery(request):    
#         media_files = MediaFile.objects.filter(user=request.user).order_by('-created_at')
#         return render(request, 'gallery/gallery.html', {'media_files': media_files})


def gallery(request):    
        media_files = MediaFile.objects.all().order_by('-created_at')
        
        if request.method == 'POST':
            form = MediaFileForm(request.POST, request.FILES)
            if form.is_valid():
                media_file = form.save(commit=False)
                media_file.user = request.user
                media_file.save()
                return redirect('gallery')
        else:
            form = MediaFileForm()
        
        return render(request, 'gallery/gallery.html', {'media_files': media_files, 'form':form, 'title': 'Upload Media'})

@login_required
def gallerydetails(request, id):
    post = get_object_or_404(MediaFile, id=id)

    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
    
    comment_form = CommentForm()
    #comments = Comment.objects.filter(post=post)
    comments = post.comment_set.all().order_by('-created_at')
    
    is_liked = False
    if post.liked_users.filter(id=request.user.id):
        is_liked = True
    else:
        is_liked = False
    like_count = post.liked_users.count()
    comment_count = comments.count()
    post.view_count += 1
    post.save()
    return render(request, 'gallery/post-details.html', {'post':post, 'comments':comments, 'comment_count':comment_count, 'comment_form':comment_form, 'is_liked':is_liked, 'like_count':like_count})


@login_required
def upload_file(request):
    if request.method == 'POST':
        form = MediaFileForm(request.POST, request.FILES)
        if form.is_valid():
            media_file = form.save(commit=False)
            media_file.user = request.user
            media_file.save()
            return redirect('gallery')
    else:
        form = MediaFileForm()
    return render(request, 'gallery/uploadfile.html', {'form':form, 'title': 'Upload Media'})

@login_required
def like_post(request, id):
    post = get_object_or_404(MediaFile, id=id)
    if post.liked_users.filter(id=request.user.id):
        post.liked_users.remove(request.user)
    else:
        post.liked_users.add(request.user)
    return redirect("gallerydetails", id=post.id)