#rest framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# serializer
from .serializers import UserSerializer

#models
from django.contrib.auth.models import Group, User
from rest_framework.authtoken.models import Token
from .models import Turma, UserProfile

# django shortcurs
from django.shortcuts import get_object_or_404

#decorators
from .decorators import allowed_roles
from rest_framework.decorators import authentication_classes, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required



@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    print(f'username: {request.data["username"]}; password: {request.data['password']}')
    if not user.check_password(request.data['password']):
        return Response({"detail": "wrong username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'msg':'loginrealizado com sucesso!',"token":token.key, "user":serializer.data, "username":request.data["username"],
                      "role":user.groups.all()[0].name})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@allowed_roles(["Administrator"])
def signup(request):
    print("Dados recebidos:", request.data)
    
    required_fields = {"username", "email", "password", "periodo"}
    if required_fields != set(request.data.keys()):
        return Response({"detail": "Campos inválidos. Use: username, email, password, periodo"}, 
                      status=status.HTTP_400_BAD_REQUEST)

    periodo = request.data['periodo']
    if len(periodo) < 4 or not periodo[-4:].isdigit():
        return Response({"detail": "Formato do período inválido. Exemplo: Diurno2025"},
                      status=status.HTTP_400_BAD_REQUEST)

    try:
        nome_turma = periodo[:-4]
        ano_turma = int(periodo[-4:])
        turma, _ = Turma.objects.get_or_create(nome=nome_turma, ano=ano_turma)
        
        user_data = {
            "username": request.data["username"],
            "email": request.data["email"],
            "password": request.data["password"]
        }
        
        serializer = UserSerializer(data=user_data)
        if not serializer.is_valid():
            print("Erros do serializer:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        user.set_password(user_data['password'])
        user.groups.add(Group.objects.get(name="student"))
        
        # Cria UserProfile e loga detalhes
        user_profile = UserProfile.objects.create(user=user, turma=turma)
        print("🐞 Perfil criado:", user_profile.id, user_profile.turma)  # Debug

        return Response({
            "detail": "✅ Aluno cadastrado com sucesso!",
            "aluno": {
                "username": user.username,
                "email": user.email,
                "turma": f"{turma.nome} {turma.ano}"
            }
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("🔥 Erro crítico:", str(e))  # Log detalhado
        return Response({"detail": "Erro interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteConta(request):
    user = User.objects.get(username=request.data["username"])
    user.delete()
    return Response(f"passed for {request.user.email}, role for this user {request.user.groups.all()[0].name}")

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response(f"passed for {request.user.email}, role for this user {request.user.groups.all()[0].name}")

