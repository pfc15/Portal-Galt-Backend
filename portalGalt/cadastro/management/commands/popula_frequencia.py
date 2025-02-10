from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Group
from cadastro.models import Turma, UserProfile
from frequencia.models import Presenca
import datetime

class Command(BaseCommand):
    def handle(self, *args, **kargs):
        with open("./cadastro/management/commands/frequencia.csv","r") as fp:
            
            datas = fp.readline().split(',') # datas
            aluno, *presenca = fp.readline()[:-1].split(',')
            presenca = list(map(int, presenca))
            print(aluno, presenca)
            user = User.objects.get(username=aluno)
            turma = Turma.objects.get(id=UserProfile.objects.get(user=user).turma.id)
            while (True):
                print(aluno, presenca)
                for mes in range(1,13):
                    for i in range(len(datas)):
                        p = Presenca.objects.create(aluno=user,presenca=presenca[i], data=datetime.date(turma.ano, mes, i+1))
                        p.save()
                    

                try:
                    aluno, *presenca = fp.readline()[:-1].split(',')
                    presenca = list(map(int, presenca))
                    user = User.objects.get(username=aluno)
                    turma = Turma.objects.get(id=UserProfile.objects.get(user=user).turma.id)
                except:
                    break
        