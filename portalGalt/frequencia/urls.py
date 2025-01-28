from django.urls import re_path,path
from . import views

urlpatterns = [
    path('getFrequencia/<str:aluno>/', views.getFrequencia, name='get_frequencia'),
]