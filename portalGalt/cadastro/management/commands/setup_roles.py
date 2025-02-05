from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission


class Command(BaseCommand):
    def handle(self, *args, **kargs):
        # groups
        administrator_group, created = Group.objects.get_or_create(name="Administrator")
        student_group, create = Group.objects.get_or_create(name="student")

        self.stdout.write(self.style.SUCCESS('Roles have been set up successfully!'))


