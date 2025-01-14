from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(User):
    class Meta:
        permissions = [("can_manage_accounts", "can manage accounts")]
