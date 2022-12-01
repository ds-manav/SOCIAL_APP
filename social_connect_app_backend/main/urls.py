from django.contrib import admin
from django.urls import path
from main.views import UserViewSet,PostViewSet,CommentViewSet

urlpatterns = [
    # READ , CREATE
    path('users/', UserViewSet.as_view({
        'get':'list',
        'post':'create'
    })),
     path('users/<str:pk>', UserViewSet.as_view({
        'get':'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
    path('posts/', PostViewSet.as_view({
        'get':'list',
        'post':'create'
    })),
    path('posts/<str:pk>', PostViewSet.as_view({
        'get':'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
    path('comments/', CommentViewSet.as_view({
        'get':'list',
        'post':'create'
    })),
    path('comments/<str:pk>', CommentViewSet.as_view({
        'get':'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
    path('login/',UserViewSet.as_view({
        'post': 'login_user'
    })),
    path('cmts/<str:pk>',CommentViewSet.as_view({
        'get': 'commentByForeignKey'
    }))
    ]