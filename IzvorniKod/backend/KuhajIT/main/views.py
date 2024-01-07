
from django.shortcuts import render
#added TODO -----------------------------------------
from django.http import JsonResponse
import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Max
from .serializers import *
from django.contrib.auth.hashers import check_password
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
                max_slike_id = Slike.objects.aggregate(Max('idslika', default = '0'))['idslika__max']
                slika_name = "temp/image" + str(max_slike_id+1) + request.data.get('ImgName')
                print(slika_name)
                base64Img = request.data.get('Img') #base64 format string
                slika_data = {
                    'slika': base64Img,
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
        user_data = [request.data.get('UserName'), request.data.get('Password')]
        user_object = Korisnik.objects.filter(korisnickoime=user_data[0])
        if(user_object.exists()): 
            passfield = getattr(user_object[0], "lozinka", None)
            return JsonResponse({'valid': user_data[1] == passfield})
        else:
            return JsonResponse({'valid': False})
        
    @api_view(['POST', 'GET'])
    def sendUserData(request):
        user_logIn = request.data.get('UserName')
        user_object = Korisnik.objects.filter(korisnickoime=user_logIn)
        userLVL = getattr(user_object[0], "razinaprivilegije")
        userLVL = abs(userLVL)
        if(userLVL == 1):
            user_data = {'username':getattr(user_object[0], "korisnickoime"),
                         'name':getattr(user_object[0],"ime"),
                         'surname':getattr(user_object[0],"prezime"),
                         'lvl':userLVL,
                         'diets':[getattr(x,"imedijeta") for x in user_object],}
        if(userLVL==2 or userLVL==3):
            special_user_object = Privilegiranikorisnik.objects.filter(korisnickoime=user_logIn)
            imgId=getattr(special_user_object[0],"idslika").idslika
            special_user_img = Slike.objects.filter(idslika=imgId)
            user_data = {'username':getattr(user_object[0], "korisnickoime"),
                         'name':getattr(user_object[0],"ime"),
                         'surname':getattr(user_object[0],"prezime"),
                         'lvl':userLVL,
                         'diets':[getattr(x,"imedijeta") for x in user_object],
                         'slika':ImgOperations.byteToString(getattr(special_user_img[0],"slika")), #ImageOperations je napravljena klasa!
                         'email':getattr(special_user_object[0],"email"),
                         'bio':getattr(special_user_object[0],"biografija"),}
        return JsonResponse(user_data)

class ProductsView(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def addProduct(request):
        if request.method == 'POST':
            max_slike_id = Slike.objects.aggregate(Max('idslika', default = '0'))['idslika__max']
            
            base64Img = request.data.get('Img') #base64 format string
            slika_data = {
                'slika': base64Img,
                'idslika' : max_slike_id + 1,
            }

            slika_serializer = SlikeSerializer(data=slika_data)

            max_proizvod_id = Slike.objects.aggregate(Max('idproizvod', default = '0'))['idproizvod__max']
            proizvod_data = {
                'IDproizvod' : max_proizvod_id + 1,
                'ImeProizvod': request.data.get('ProductName'),
                'EnergijaPr': request.data.get('Energy'),
                'MasnocePr': request.data.get('Fats'),
                'BjelancevinePr': request.data.get('Proteins'),
                'UgljikohidratiPr': request.data.get('Carbohydrates'),
                'SolPr': request.data.get('Salt'),
                'MasaPr': request.data.get('Mass'),
                'ZMKiselinePr': request.data.get('Acids'),
                'SeceriPr': request.data.get('Sugars'),
                'IDslika': max_slike_id + 1,
            }
            
            proizvod_serializer = ProizvodSerializer(data=proizvod_data)
            
            if slika_serializer.is_valid() and proizvod_serializer.is_valid():
                slika_serializer.save()
                proizvod_serializer.save()
                
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': slika_serializer.errors or proizvod_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

class ImgOperations:

    def byteToString(byteImg):
        stringImg = byteImg.decode('ascii')
        return stringImg
    
    def qrCodeAnalize(): # TODO obrada qrKoda
        pass
    
