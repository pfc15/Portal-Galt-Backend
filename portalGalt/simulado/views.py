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
# Create your views here.


class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Use MultiPartParser to handle file uploads

    def post(self, request, *args, **kwargs):
        serializer = FileUploadSerializer(data=request.data)

        if serializer.is_valid():
            uploaded_file = serializer.validated_data['gabarito']
            caminho = f'uploads/{uploaded_file.name}'
            # Process the file (e.g., save it to disk or perform other operations)
            with open(caminho, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            
            uploaded_file = serializer.validated_data['respostas']
            caminho2 = f'uploads/{uploaded_file.name}'
            # Process the file (e.g., save it to disk or perform other operations)
            with open(caminho2, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            
            corrigido = simuladoAanaliser(caminho_arquivo_gabarito=caminho, caminho_arquivo_respostas=caminho2, nome=serializer.validated_data['nome'])

            return Response({"correcao":corrigido.df_coorrige}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getNota(request, aluno, simuladoNome):
#     simulado = Simulado.objects.get(nome=simuladoNome)
#     retorno = {simuladoNome:{}}
#     if aluno != "null":
#         user = User.objects.get(username=aluno)
#         nota = Nota.objects.get(aluno=aluno, simulado=simulado)
#     else:
#         users = User.objects.all()
#         for u in users:
#             retorno[simuladoNome][u]


#     return Response({nota}, status=status.HTTP_200_OK)


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