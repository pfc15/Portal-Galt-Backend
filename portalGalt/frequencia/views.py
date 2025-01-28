from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.contrib.auth.models import Group, User
from .models import Presenca

from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes


from django.shortcuts import get_object_or_404



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

