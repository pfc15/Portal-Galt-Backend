from django.db import models
from django.contrib.auth.models import User


class Presenca(models.Model):
    data = models.DateField()
    presenca = models.IntegerField()
    aluno = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.aluno} {self.data}: {self.presenca if self.presenca>0 else "ausente"}"





