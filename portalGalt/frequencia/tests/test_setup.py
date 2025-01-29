from rest_framework.test import APITestCase

from django.contrib.auth.models import Group, User
from rest_framework.authtoken.models import Token
from frequencia.models import Presenca
import datetime


class TestSetUp(APITestCase):
    def setUp(self):
        

        self.groupAdmin, create = Group.objects.get_or_create(name="Administrator")
        self.groupStudent, create = Group.objects.get_or_create(name="student")

        # setup contas
        self.admin, create = User.objects.get_or_create(username="test_user_admin", email="teste@test.com", password="password")
        self.admin.set_password("password")
        self.admin.groups.add(self.groupAdmin)
        self.admin.save()
        self.student, create = User.objects.get_or_create(username="test_user_student", email="teste@test.com", password="password")
        self.student.set_password("password")
        self.student.groups.add(self.groupStudent)
        self.student.save()
        self.student2, create = User.objects.get_or_create(username="test_user_student2", email="teste2@test.com", password="password")
        self.student2.set_password("password")
        self.student2.groups.add(self.groupStudent)
        self.student2.save()

        self.token_admin = Token.objects.create(user=self.admin)
        self.token_student = Token.objects.create(user=self.student)

        self.header = {
            'CONTENT_TYPE': 'application/json'
        }

        self.header_admin = {
            'CONTENT_TYPE': 'application/json',
            "Authorization": f"Token {self.token_admin}"
        }

        self.header_student = {
            'CONTENT_TYPE': 'application/json',
            "Authorization": f"Token {self.token_student}"
        }

        self.user_data_not_exist = {
            "email": "email@email.com",
            "username": "email",
            "password": "senha",
        }

        self.user_data_admin = {
            "email": "teste@test.com",
            "username": "test_user_admin",
            "password": "password",
        }

        self.user_data_student = {
            "email": "teste@test.com",
            "username": "test_user_student",
            "password": "password",
        }

        self.user_data_student2 = {
            "email": "teste2@test.com",
            "username": "test_user_student2",
            "password": "password",
        }


        # setup frequencia
        e = 0
        for i in range(1, 31):
            self.date = datetime.date(2025, 1, i)
            presenca = Presenca(aluno=self.student, data=self.date, presenca=e)
            e = (e+1)%6
            presenca.save()
        

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()
