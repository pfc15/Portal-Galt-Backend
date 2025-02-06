from frequencia.tests.test_setup import TestSetUp
from django.urls import reverse

# to run only one test linux/bash
# python3 manage.py test frequencia.tests.tests_views.TestViews.TESTMETHOD


class TestViews(TestSetUp):

    def test_get_frequencia_sucessfull_admin_to_student(self):
        username = self.user_data_student["username"]
        self.client.force_login(self.admin)
        get_frequencia_url = reverse("get_frequencia", 
                args=(username, ))
        

        res = self.client.get(get_frequencia_url, 
                None, **self.header_admin)
        presenca = res.data["presenca"]
        self.assertEqual(res.status_code, 200)
        self.assertEqual(list(presenca.keys())[0], '2025-01-01')
        self.assertEqual(list(presenca.items())[-1], ('2025-01-30', 5))
    
    def test_get_frequencia_sucessfull_student_self(self):
        username = self.user_data_student["username"]
        self.client.force_login(self.student)
        get_frequencia_url = reverse("get_frequencia", 
                args=(username, ))
        
        res =self.client.get(get_frequencia_url, None, **self.header_student)
        presenca = res.data["presenca"]
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(list(presenca.keys())[0], '2025-01-01')
        self.assertEqual(list(presenca.items())[-1], ('2025-01-30', 5))
    
    def test_get_frequencia_no_permission(self):
        username = self.user_data_student2["username"]
        self.client.force_login(self.student)
        get_frequencia_url = reverse("get_frequencia", 
                args=(username, ))
        
        res =self.client.get(get_frequencia_url, None, **self.header_student)
        
        self.assertEqual(res.status_code, 401)
    
    def test_get_frequencia_invalid_user(self):
        username = self.user_data_not_exist["username"]
        self.client.force_login(self.admin)
        get_frequencia_url = reverse("get_frequencia", 
                args=(username, ))
        
        res =self.client.get(get_frequencia_url, None, **self.header_student)

        self.assertEqual(res.status_code, 404)
    
    def test_getFrequenciaTurma_sucessfull(self):
        self.client.force_login(self.admin)
        get_frequencia_url = reverse("get_frequencia_turma", 
                args=(self.turma_existe_data["nome"], "2025-01-01"))
        
        res = self.client.get(get_frequencia_url, None, **self.header_admin)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["alunos_presentes"], 0)
        self.assertEqual(res.data["faltas"], 1)
        self.assertEqual(res.data["presenca"][self.student.username], 0)
    
    
    def test_getFrequenciaTurma_no_permission(self):
        self.client.force_login(self.student)
        get_frequencia_url = reverse("get_frequencia_turma",
            args=(self.turma_existe_data["nome"], "2025-01-01"))
        
        res = self.client.get(get_frequencia_url, None, **self.header_admin)

        self.assertEqual(res.status_code, 401)
    
    def test_getFrequenciaTurma_invalid_turma(self):
        self.client.force_login(self.admin)
        get_frequencia_url = reverse("get_frequencia_turma",
            args=(self.turma_falsa_data["nome"], "2025-01-01"))
        
        res = self.client.get(get_frequencia_url, None, **self.header_admin)

        self.assertEqual(res.status_code, 404)
    

