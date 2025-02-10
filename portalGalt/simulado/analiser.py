import pandas as pd
import numpy as np
from .models import *
from django.contrib.auth.models import User
import json

class simuladoAanaliser():
    def __init__(self, nome, respostas, gabarito,ano,mes, dia, update=False):
        if not update:
            aluno_real = nome.replace("'","")
            simulado = Simulado.objects.create(nome=aluno_real, quant_questoes=len(gabarito),path_gabarito=gabarito, path_respostas=respostas
                                               ,ano=ano, mes=mes, dia=dia)
            simulado.save()
            

            # Corrigir e exibir as notas
            notas_finais = self.corrigir_prova(respostas, gabarito)
            for aluno, nota in notas_finais.items():
                aluno_real = aluno.replace("'","")
                print(f"{aluno_real}: {nota} acertos")
                user = User.objects.get(username=aluno_real)
                nova_nota = Nota.objects.create(aluno=user, quant_acertos=nota, questoes=json.dumps(respostas[aluno]), simulado=simulado)
                nova_nota.save()
            
        else:
            aluno_real = update.replace("'","")
            simulado = Simulado.objects.get(nome=aluno_real)
            if len(respostas) ==0:
                respostas = simulado.path_respostas
            if len(gabarito) == 0:
                gabarito = simulado.path_gabarito
            
            simulado.path_respostas = respostas
            simulado.path_gabarito = gabarito
            simulado.nome = nome
            simulado.ano = ano
            simulado.mes = mes
            simulado.dia = dia
            simulado.save()

            notas_finais = self.corrigir_prova(respostas, gabarito)
            for aluno, nota in notas_finais.items():
                aluno_real = aluno.replace("'","")
                print(f"{aluno_real}: {nota} acertos")
                user = User.objects.get(username=aluno_real)
                nova_nota, created = Nota.objects.get_or_create(aluno=user, simulado=simulado)
                nova_nota.quant_acertos=nota
                nova_nota.questoes=json.dumps(respostas[aluno])
                nova_nota.save()
            

# Função para corrigir as respostas
    def corrigir_prova(self, respostas, gabarito):
        notas = {}
        for aluno, re in respostas.items():
            acertos = sum(1 for questao, r in re.items() if r == gabarito.get(questao))
            respostas[aluno] = [True if r == gabarito.get(questao) else False for questao, r in re.items()]
            notas[aluno] = acertos  # Nota é o número de acertos
        return notas



if __name__=="__main__":
    a = simuladoAanaliser(f'/home/pfc15/Documents/2024.2/requisitos/2024.2-T03-PortalGalt/portalGalt/uploads/teste1.csv', '/home/pfc15/Documents/2024.2/requisitos/2024.2-T03-PortalGalt/gabarito.csv')
    print(a.df_coorrige)