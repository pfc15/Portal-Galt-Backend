from django.db import models
from django.contrib.auth.models import User


class Turma(models.Model):
    nome = models.TextField()
    ano = models.IntegerField()

    class Meta:
        unique_together = ('nome', 'ano')
        
    def __str__(self):
        return f'{self.nome} {self.ano}'

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user}'
