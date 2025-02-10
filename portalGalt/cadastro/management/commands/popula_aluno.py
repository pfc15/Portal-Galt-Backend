from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Group
from cadastro.models import Turma, UserProfile

class Command(BaseCommand):
    def handle(self, *args, **kargs):
        with open("/home/pfc15/Documents/2024.2/requisitos/2024.2-T03-PortalGalt/portalGalt/cadastro/management/commands/alunos.csv","r") as fp:
            
            info = fp.readline().split(',') # 0: nome; 1: turma; 2:email; 3: senha
            while (len(info)>1):
                print(info)
                if not Turma.objects.filter(nome=info[1]).exists():
                    ano = int(info[1][-4:])
                    turma = Turma.objects.create(nome=info[1], ano=ano)
                    turma.save()
                else:
                    turma = Turma.objects.get(nome=info[1])
                if not User.objects.filter(username=info[0]).exists():
                    user = User.objects.create(username=info[0], email=info[2], password="")
                    user.set_password(info[3])
                    user.groups.add(Group.objects.get(name='student'))
                    user.save()
                    profile = UserProfile(user=user, turma=turma)
                    profile.save()
                info = fp.readline().split(',')
        
