from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ("nome","ano")

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user","turma")