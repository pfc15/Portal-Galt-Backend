from .test_setup import TestSetUp
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User, Group
from django.test import TestCase
import json


class TestViews(TestSetUp):

    def test_user_cannot_register_with_not_data(self):
        res = self.client.post(self.signup_url)
        self.assertEqual(res.status_code, 400)


    def test_login_sucefull(self):

        header = {
            'CONTENT_TYPE': 'application/json'
        }
        res = self.client.post(self.login_url, self.user_data_admin   
        , **header)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["user"]["username"], self.user_data_admin["username"])
        self.assertEqual(res.data["user"]["email"], self.user_data_admin["email"])


        # Call the function that queries the User model




