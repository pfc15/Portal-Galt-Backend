import pandas as pd
import numpy as np
from .models import *
from django.contrib.auth.models import User
import json

class simuladoAanaliser():
    def __init__(self, nome, caminho_arquivo_respostas, caminho_arquivo_gabarito):
        df_alunos = pd.read_csv(caminho_arquivo_respostas)
        df_gabarito = pd.read_csv(caminho_arquivo_gabarito)
        df_gabarito.set_index('questão', inplace=True)
        print(len(df_gabarito))
        simulado = Simulado.objects.create(nome=nome, quant_questoes=len(df_gabarito),path_gabarito=caminho_arquivo_gabarito, path_respostas=caminho_arquivo_respostas)
        simulado.save()

        # Remover a coluna 'aluno' para realizar a comparação
        df_alunos_no_names = df_alunos.drop(columns=['aluno'])
        df_alunos_no_names = df_alunos_no_names.reindex(columns=df_gabarito.index)

        # Comparar as respostas dos alunos com o gabarito
        df_corrigido = pd.DataFrame()
        index =0
        questoes = df_alunos_no_names.columns
        for i in range(len(questoes)):
            for e in df_alunos_no_names.iterrows():
                df_corrigido[questoes[index]] = df_alunos_no_names[questoes[index]] == df_gabarito['gabarito'].iloc[0]
            index+=1

        # Adicionar o nome dos alunos novamente no DataFrame corrigido
        df_corrigido['aluno'] = df_alunos['aluno']
        
       
        df_corrigido.set_index('aluno', inplace=True)
        for row in df_corrigido.iterrows():
            aluno = User.objects.get(username=row[0])
            a = dict(row[1])
            for k,v in a.items():
                a[k] = True if np.True_ else False
            print('-='*25)
            print(a)
            nova_nota = Nota.objects.create(aluno=aluno, quant_acertos=sum(a.values()), questoes=json.dumps(a), simulado=simulado)
            nova_nota.save()
        
        df_corrigido = df_corrigido.transpose()
        

        self.df_coorrige = df_corrigido.to_json()




if __name__=="__main__":
    a = simuladoAanaliser(f'/home/pfc15/Documents/2024.2/requisitos/2024.2-T03-PortalGalt/portalGalt/uploads/teste1.csv', '/home/pfc15/Documents/2024.2/requisitos/2024.2-T03-PortalGalt/gabarito.csv')
    print(a.df_coorrige)