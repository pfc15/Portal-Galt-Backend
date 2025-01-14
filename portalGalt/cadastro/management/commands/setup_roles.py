from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from cadastro.models import User

class Command(BaseCommand):
    def handle(self, *args, **kargs):
        # groups
        administrator_group, created = Group.objects.get_or_create(name="Administrator")
        student_group, create = Group.objects.get_or_create(name="student")

        # Assing Permission
        manage_accounts = Permission.objects.get(codename='can_manage_accounts')


        # add permission to group
        administrator_group.permissions.add(manage_accounts)
        self.stdout.write(self.style.SUCCESS('Roles and permissions have been set up successfully!'))


