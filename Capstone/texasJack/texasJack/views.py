from django.http import HttpResponse
from django.shortcuts import render 

def login(request): 
    # return HttpResponse('homepage')
    return render(request, 'login.html')

