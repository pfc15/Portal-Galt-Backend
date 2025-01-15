from .test_setup import TestSetUp
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User, Group
from django.test import TestCase
import json

# to run only one test linux/bash
# python3 manage.py test cadastro.tests.tests_views.TestViews.TESTMETHOD


class TestViews(TestSetUp):

    def test_user_cannot_register_with_not_data(self):
        res = self.client.post(self.signup_url)
        self.assertEqual(res.status_code, 400)


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

   
        




