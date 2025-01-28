from django.db import models
from django.contrib.auth.models import User


class presenca(models.Model):
    data = models.DateField()
    presenca = models.IntegerField()
    aluno = models.ForeignKey(User, on_delete=models.CASCADE)





