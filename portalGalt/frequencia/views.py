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
            dic = {}
            dic["presenca"] = d.presenca
            dic["nome"] = aluno
            dict_retorno[str(d.data)] = [dic.copy()]
        
        return Response({'presenca':dict_retorno}, status=status.HTTP_200_OK)

    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getFrequenciaTurma(request, turma_nome, dia):
    day, month, year = dia.split("-")
    dia = f"{year}-{month}-{day}"
    turma = get_object_or_404(Turma, nome=turma_nome)
    if request.user.groups.all()[0].name == 'Administrator':
        alunos = UserProfile.objects.filter(turma=turma)
        lista = []
        
        alunos_presentes = 0
        for alunoProfile in alunos:
            dict_retorno = {}
            aluno = User.objects.get(username=alunoProfile.user)
            presenca = Presenca.objects.get(aluno=aluno, data=dia)
            if presenca.presenca==AULAS_POR_DIA:
                alunos_presentes+=1
            dict_retorno["nome"] = aluno.username
            dict_retorno["presenca"] = presenca.presenca
            lista.append(dict_retorno.copy())
        dic = {}
        year, month, day = dia.split("-")
        dia = f"{day}/{month}/{year}"
        dic[dia] = lista

        return Response({"presenca":dic, "alunos_presentes":alunos_presentes, "faltas":len(lista)-alunos_presentes}, status=status.HTTP_200_OK)

    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getListaAlunos(request):
    if request.user.groups.all()[0].name == 'Administrator':
        usuarios = User.objects.filter(groups=Group.objects.get(name="student"))
        lista_usuario = []
        for user in usuarios:
            lista_usuario.append(user.username)

        return Response({"lista_usuario":lista_usuario}, status=status.HTTP_200_OK)
    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getListaDatas(request):
    if request.user.groups.all()[0].name == 'Administrator':
        datas = Presenca.objects.all()
        lista_datas = []
        for d in datas:
            year, month, day = str(d.data).split("-")
            dia = f"{day}/{month}/{year}"
            if dia not in lista_datas:
                lista_datas.append(dia)
        return Response({"lista_datas":lista_datas}, status=status.HTTP_200_OK)
    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def getListaTurmas(request):
    if request.user.groups.all()[0].name == 'Administrator':
        turmas= Turma.objects.all()
        lista_datas = []
        for t in turmas:
            if t.nome not in lista_datas:
                lista_datas.append(t.nome)
        return Response({"lista_turmas":lista_datas}, status=status.HTTP_200_OK)
    return Response({'deatil': 'does not have permission to acess this information'}, status=status.HTTP_401_UNAUTHORIZED)
