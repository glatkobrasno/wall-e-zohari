from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *

# Create your views here.


from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')

class SignUpView(serializers.Serializer):
    @api_view(['POST'])
    def sign_up_save(request): # geting data from react data(Name, Surname, Email, UserName, Password, PasswordC, Bio, Img, ImgName, ImgType, Roll)
        if request.method == 'POST':
            role = request.data.get('Roll')
            if role == 'LVL1':
                korisnik_data = {
                    'korisnickoime': request.data.get('UserName'),
                    'lozinka': request.data.get('Password'),
                    'ime': request.data.get('Name'),
                    'prezime': request.data.get('Surname'),
                    'razinaprivilegije': 1,
                }

                korisnik_serializer = KorisnikSerializer(data=korisnik_data)
                
                if korisnik_serializer.is_valid():
                    korisnik_serializer.save()
                    return Response({'success': True}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': korisnik_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            elif role in ['LVL2', 'LVL3']:
                slika_data = {
                    'slika': request.data.get('Img'),
                }

                privilegirani_data = {
                    'korisnickoime': request.data.get('UserName'),
                    'email': request.data.get('Email'),
                    'biografija': request.data.get('Bio'),
                    'idslika' : None,
                }

                korisnik_data = {
                    'korisnickoime': privilegirani_data['korisnickoime'],
                    'lozinka': request.data.get('Password'),
                    'ime': request.data.get('Name'),
                    'prezime': request.data.get('Surname'),
                    'razinaprivilegije': -2 if role == 'LVL2' else -3,
                }

                slika_serializer = SlikeSerializer(data=slika_data)
                korisnik_serializer = KorisnikSerializer(data=korisnik_data)

                if slika_serializer.is_valid() and korisnik_serializer.is_valid():
                    slika = slika_serializer.save()
                    privilegirani_data['idslika'] = slika.idslika
                    privilegirani_serializer = PrivilegiranikorisnikSerializer(data=privilegirani_data)
                    
                    if privilegirani_serializer.is_valid():
                        korisnik_serializer.save()
                        privilegirani_serializer.save()
                        return Response({'success': True}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': korisnik_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': slika_serializer.errors or privilegirani_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
    
    def check_username(request):
        username = request.data.get('username')  #data received ('username')

        try:
            korisnik_instance = Korisnik.objects.get(korisnickoime=username)
            return JsonResponse({'is_taken': True})
        except Korisnik.DoesNotExist:
            return JsonResponse({'is_taken': False})