from django.db import models

# Create your models here.

class Simulado(models.Model):
    nome = models.CharField()
    path = models.CharField()
    
