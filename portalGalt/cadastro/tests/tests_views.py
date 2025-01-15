from .test_setup import TestSetUp
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User, Group
from django.test import TestCase
import json
from django.urls import reverse

# to run only one test linux/bash
# python3 manage.py test cadastro.tests.tests_views.TestViews.TESTMETHOD


class TestViews(TestSetUp):
    signup_url = reverse('signup')
    login_url = reverse('login')

    # signup
    def test_signup_sucessfull(self):
        self.client.force_login(self.admin)
        new_header = self.header
        new_header["Authorization"] = f"Token {self.token_admin}"

        data = self.user_data_not_exist
        data["role"] = "Administrator"

        res = self.client.post(self.signup_url, self.user_data_not_exist, **new_header)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["username"], self.user_data_not_exist["username"])
        self.assertEqual(res.data["email"], self.user_data_not_exist["email"])
        self.assertEqual(res.data["role"], data["role"])


    def test_signup_user_cannot_register_with_no_data(self):
        self.client.force_login(self.admin)

        new_header = self.header
        new_header["Authorization"] = f"Token {self.token_admin}"
        res = self.client.post(self.signup_url,None,**new_header)
        self.assertEqual(res.status_code, 400)

    def test_signup_students_cannot_create_user(self):
        self.client.force_login(self.student)

        new_header = self.header
        new_header["Authorization"] = f"Token {self.token_admin}"
        data = self.user_data_not_exist
        data["role"] = "Administrator"

        res = self.client.post(self.signup_url, self.user_data_not_exist, **new_header)
        self.assertEqual(res.status_code, 401)
        

    #login test cases
    def test_login_sucessfull(self):

        header = {
            'CONTENT_TYPE': 'application/json'
        }
        res = self.client.post(self.login_url, self.user_data_admin   
        , **header)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["user"]["username"], self.user_data_admin["username"])
        self.assertEqual(res.data["user"]["email"], self.user_data_admin["email"])

    
    def test_login_User_Not_exists(self):
        
        res = self.client.post(self.login_url, self.user_data_not_exist, **self.header)
        self.assertEqual(res.status_code, 404)
    
    def test_login_worng_password(self):
        data = self.user_data_admin
        data["password"] = "not his password"
        res = self.client.post(self.login_url, data, **self.header)
        self.assertEqual(res.status_code, 401)
