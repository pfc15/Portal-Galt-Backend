from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import FileUploadSerializer
from .analiser import simuladoAanaliser
from .models import *

from django.contrib.auth.models import Group, User
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
@api_view(['POST'])
def fileUpload(request):
    corrigido = simuladoAanaliser(gabarito=request.data["gabarito"], respostas=request.data["respostas"], nome=request.data["nome"])

    return Response({"datail": "ok!"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getListSimulados(request, aluno):
    if aluno == "null":
        simulados = Simulado.objects.all()
        retorno = {}
        for s in simulados:
            retorno[s.nome] = {}
            notas = Nota.objects.filter(simulado=s)
            for n in notas:
                retorno[s.nome][n.aluno.username] = n.questoes
        return Response({"lista_simulados":retorno}, status=status.HTTP_200_OK)
    else:
        alunos = Nota.objects.filter(aluno=aluno)
        simulados = {}
        for a in alunos:
            s = Simulado.objects.get(a.simulado).nome
            retorno[s.nome] = {a.aluno.username:a.questoes}
        return Response({"lista_simulados":simulados}, status=status.HTTP_200_OK)