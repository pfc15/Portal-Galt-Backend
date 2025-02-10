
from django.contrib import admin
from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('upload/', fileUpload),
    # path('getNota/<str:aluno>/<str:simuladoNome>/', getNota),
    path('getListSimulados/<str:aluno>/', getListSimulados),
    path('getSimulado/<str:simuladoNome>/', getSimulado),
    path('getAllSimulado/', getAllSimulado)

]
