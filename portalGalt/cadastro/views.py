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

# django shortcurs
from django.shortcuts import get_object_or_404

#decorators
from .decorators import allowed_roles
from rest_framework.decorators import authentication_classes, permission_classes



@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    print(f'username: {request.data["username"]}; password: {request.data['password']}')
    if not user.check_password(request.data['password']):
        return Response({"detail": "wrong username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'msg':'loginrealizado com sucesso!',"token":token.key, "user":serializer.data})


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@allowed_roles(["Administrator"])
def signup(request):
    if set(["username", "email", "password", "role"]) ==  set(request.data.keys()):
        data = {"username":request.data["username"], "email":request.data["email"], "password":request.data["password"]}
        serializer = UserSerializer(data=data)
        if serializer.is_valid() and "role" in request.data.keys():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.groups.add(Group.objects.get(name=request.data["role"]))
            user.save()
            

            token = Token.objects.create(user=user)
            

            return Response({"token":token.key, "username":user.username, "email":user.email, "role":user.groups.all()[0].name}, status=status.HTTP_200_OK)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail":"form not in format"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response(f"passed for {request.user.email}, role for this user {request.user.groups.all()[0].name}")