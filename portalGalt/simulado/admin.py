from django.contrib import admin
from .models import Simulado, Nota

@admin.register(Simulado)
class SimuladoAdmin(admin.ModelAdmin):
    pass

@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = ('aluno', 'simulado')