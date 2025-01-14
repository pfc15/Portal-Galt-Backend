
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from functools import wraps


def allowed_roles(allowed_roles=[]):
    def decorator(view_func):
        @wraps(decorator)
        def wrapper_func(request, *args, **kwargs):
            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name
                print(group)
            
            if group in allowed_roles:
                return view_func(request,*args, **kwargs)
            else:
                return Response("user does not have permission to  make this action", status=status.HTTP_400_BAD_REQUEST)
        
        return wrapper_func
    return decorator