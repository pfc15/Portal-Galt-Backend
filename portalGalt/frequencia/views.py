from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.contrib.auth.models import Group, User
from .models import Presenca
from cadastro.models import Turma, UserProfile

from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes


from django.shortcuts import get_object_or_404


AULAS_POR_DIA = 5

# Create your views here.
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getFrequencia(request, aluno):
    user = get_object_or_404(User, username=aluno)
    if request.user.groups.all()[0].name == 'Administrator' or request.user.username == user.username:
        dias = Presenca.objects.filter(aluno=user)
        dict_retorno = {}
        for d in dias:
            dict_retorno[str(d.data)] = d.presenca
        return Response({'presenca':dict_retorno}, status=status.HTTP_200_OK)

    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getFrequenciaTurma(request, turma_nome, dia):
    turma = get_object_or_404(Turma, nome=turma_nome)
    if request.user.groups.all()[0].name == 'Administrator':
        alunos = UserProfile.objects.filter(turma=turma)
        dict_retorno = {}
        alunos_presentes = 0
        for alunoProfile in alunos:
            aluno = User.objects.get(username=alunoProfile.user)
            presenca = Presenca.objects.get(aluno=aluno, data=dia)
            if presenca.presenca==AULAS_POR_DIA:
                alunos_presentes+=1
            dict_retorno[aluno.username] = presenca.presenca
        
        return Response({'presenca':dict_retorno, "alunos_presentes":alunos_presentes, "faltas":len(dict_retorno)-alunos_presentes}, status=status.HTTP_200_OK)

    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)

