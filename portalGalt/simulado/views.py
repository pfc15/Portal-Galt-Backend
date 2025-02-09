from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import FileUploadSerializer
from .analiser import simuladoAanaliser
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
            
            corrigido = simuladoAanaliser(caminho_arquivo_gabarito=caminho, caminho_arquivo_respostas=caminho2)

            return Response({"correcao":corrigido.df_coorrige}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

