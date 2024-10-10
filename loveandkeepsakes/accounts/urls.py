from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    #path('api/register/', views.register, name='api_register'),
    #path('api/login/', views.login_view, name='api_login'),
]