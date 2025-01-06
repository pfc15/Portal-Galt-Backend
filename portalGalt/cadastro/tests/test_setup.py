from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):
    def setUp(self):
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')

        user_data = {
            "email": "email@email.com",
            "username": "email",
            "password": "senha",
        }

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()
