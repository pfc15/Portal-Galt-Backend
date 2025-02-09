from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Simulado(models.Model):
    nome = models.CharField(max_length=100)
    path_respostas = models.CharField(max_length=300)
    path_gabarito = models.CharField(max_length=300)
    quant_questoes = models.IntegerField()

    def __string__(self):
        return self.nome

class Nota(models.Model):
    aluno = models.ForeignKey(User, on_delete=models.CASCADE)
    quant_acertos = models.IntegerField()
    questoes = models.JSONField()
    simulado = models.ForeignKey(Simulado, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.simulado}: {self.aluno}"




