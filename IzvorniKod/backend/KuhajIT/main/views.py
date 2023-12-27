
from django.shortcuts import render
#added TODO -----------------------------------------
from django.http import JsonResponse
import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Max
from .serializers import *
from django.core.files.base import ContentFile
from io import BytesIO
#added TODO ------------------------------------------
from .models import *

# Create your views here.


from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')

class SignUpView(serializers.Serializer): # klasa za obradu requestova za SignUp
    @api_view(['POST', 'GET'])
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
                max_slike_id = Slike.objects.aggregate(Max('idslika'))['idslika__max']
                slika_name = "temp/image" + str(max_slike_id+1) + request.data.get('ImgName')
                print(slika_name)
                binaryImg = ImgOperations.ImgDecodeB64(request.data.get('Img'))
                slika_data = {
                    'slika': ContentFile(binaryImg, name=slika_name),
                    'idslika' : max_slike_id+1,
                }
                #print(slika_data['slika'])

                privilegirani_data = {
                    'korisnickoime': request.data.get('UserName'),
                    'email': request.data.get('Email'),
                    'biografija': request.data.get('Bio'),
                    'idslika' : max_slike_id+1,
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
                    slika_serializer.save()
                    korisnik_serializer.save()
                    #privilegirani_data['idslika'] = slika.idslika
                    privilegirani_serializer = PrivilegiranikorisnikSerializer(data=privilegirani_data)
                    
                    if privilegirani_serializer.is_valid():
                        privilegirani_serializer.save()
                        return Response({'success': True}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': korisnik_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': slika_serializer.errors or privilegirani_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
    @api_view(['POST', 'GET'])
    def check_username(request):
        username_data = request.data.get('username')
        user_object = Korisnik.objects.filter(korisnickoime=username_data)
        user_list = [user.korisnickoime for user in user_object]
        print(user_object.exists())
        return JsonResponse({'taken': user_object.exists()})
    
class LogInView(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def validateLogIn(request):
        user_data = [request.data.get('username'), request.data.get('password')]
        user_object = Korisnik.objects.filter(korisnickoime=user_data[0])
        # user_list = [user.korisnickoime for user in user_object]
        return JsonResponse({'taken': user_object.exists()})


class ImgOperations:
    def ImgDecodeB64(b64Img):
        decoded_image_data = base64.b64decode(b64Img)
        return decoded_image_data
    

    def qeCodeAnalize(): # TODO obrada qrKoda
        pass
    