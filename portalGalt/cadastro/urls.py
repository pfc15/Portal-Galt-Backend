from django.urls import re_path,path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('signup/', views.signup),
    path('token/', views.test_token),
]