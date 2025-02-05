from django.contrib import admin
from .models import Presenca

@admin.register(Presenca)
class FrequenciaAdmin(admin.ModelAdmin):
    list_display = ("data","presenca", 'aluno')