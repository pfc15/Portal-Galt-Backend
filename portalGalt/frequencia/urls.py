from django.urls import re_path,path
from . import views

urlpatterns = [
    path('getFrequencia/<str:aluno>/', views.getFrequencia, name='get_frequencia'),
    path("getFrequenciaTurma/<str:turma_nome>/<str:dia>/", views.getFrequenciaTurma, name="get_frequencia_turma"),
    path("getAllstudents/", views.getListaAlunos, name="get_lista_alunos"),
    path("getAllstudentsComplete/", views.getListaAlunosComplete, name="get_lista_alunos"),
    path("getAlldates/", views.getListaDatas, name="get_lista_datas"),
    path("getAllturmas/", views.getListaTurmas, name="get_lista_turmas"),
    
]