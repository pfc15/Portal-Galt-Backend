from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import Group, User
from rest_framework.authtoken.models import Token


class TestSetUp(APITestCase):
    def setUp(self):
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')

        self.groupAdmin, create = Group.objects.get_or_create(name="Administrator")
        self.groupStudent, create = Group.objects.get_or_create(name="student")


        self.admin, create = User.objects.get_or_create(username="test_user_admin", email="teste@test.com", password="password")
        self.admin.set_password("password")
        self.admin.save()
        self.student, create = User.objects.get_or_create(username="test_user_student", email="teste@test.com", password="password")
        self.student.set_password("password")
        self.student.save()

        self.token_admin = Token.objects.create(user=self.admin)
        self.token_student = Token.objects.create(user=self.student)

        self.header = {
            'CONTENT_TYPE': 'application/json'
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

        

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()
