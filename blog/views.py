from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Post, Category, Tag
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from django.contrib import messages
from django.core.paginator import Paginator
from datetime import datetime
from django.db.models import Q

# Create your views here.
def blog(request):
    categoryQ = request.GET.get('category', None)
    tagQ = request.GET.get('tag', None)
    if categoryQ:
        posts = Post.objects.filter(category__name=categoryQ)
    elif tagQ:
        posts = Post.objects.filter(tag__name=tagQ)
    else:
        posts = Post.objects.filter(Q(publish_at__lte=datetime.now()) & Q(status='publish')).prefetch_related('category').prefetch_related('tag').order_by('-publish_at')
    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)   
    categories = Category.objects.all()
    tags = Tag.objects.all()
    return render(request, 'blog/blog.html', {'posts':page_obj, 'categories':categories, 'tags':tags})

def blogdetails(request, id):
    posts = Post.objects.all()
    post = get_object_or_404(Post, id=id)
    categories = Category.objects.all()
    tags = Tag.objects.all()
    return render(request, 'blog/blog-details.html', {'posts':posts, 'post':post, 'categories':categories, 'tags':tags})

@login_required
def createpost(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('blog')
            #return HttpResponse("Post created successfully!")
        else:
            # Return a response even if the form is not valid
            return render(request, 'blog/createpost.html', {'form': form})
    else:
        form = PostForm()
    return render(request, 'blog/createpost.html', {'form': form})

@login_required
def updatepost(request, id):
    post = get_object_or_404(Post, id=id)
    if request.user!= post.author:
        messages.error(request, 'You are not author of this post.')
        return redirect('blogdetails', id=post.id)
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            form.save()
            messages.success(request, 'Post Updated Successfully')
            return redirect('blog')
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/createpost.html', {'form':form})

@login_required
def deletepost(request, id):
    post = get_object_or_404(Post, id=id)
    if request.user != post.author:
        messages.error(request, 'You are not have permission to delete this post.')
        return redirect('blog')
    post.delete()
    messages.success(request, 'Post Deleted Successful.')
    return redirect('blog')