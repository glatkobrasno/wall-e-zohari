from django.shortcuts import render

# Create your views here.


from django.http import HttpResponse


def index(request):
    return HttpResponse("\"Home\" stranica za auth.")


def login(request):
    return render(request, 'login.html')


def signup(request):
    return render(request, 'signup.html')
