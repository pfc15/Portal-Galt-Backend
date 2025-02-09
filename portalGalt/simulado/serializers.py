from rest_framework import serializers

class FileUploadSerializer(serializers.Serializer):
    gabarito = serializers.FileField()
    respostas = serializers.FileField()