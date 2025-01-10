from .test_setup import TestSetUp


class TestViews(TestSetUp):

    def test_user_cannot_register_with_not_data(self):
        res = self.client.post(self.signup_url)
        self.assertEqual(res.status_code, 400)

