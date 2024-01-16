
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

        def dijeta_to_dict(dijeta):
            return {
            'imedijeta': getattr(dijeta, "imedijeta_id"),
            }


        user_logIn = request.data.get('UserName')
        user_object = Korisnik.objects.filter(korisnickoime=user_logIn)
        userLVL = getattr(user_object[0], "razinaprivilegije")
        userLVL = abs(userLVL)
        if(userLVL == 1 or userLVL == 4):
            user_data = {'username':getattr(user_object[0], "korisnickoime"),
                         'name':getattr(user_object[0],"ime"),
                         'surname':getattr(user_object[0],"prezime"),
                         'lvl':userLVL,
                         'diets': [dijeta_to_dict(x) for x in user_object],
                         }
        if(userLVL==2 or userLVL==3):
            special_user_object = Privilegiranikorisnik.objects.filter(korisnickoime=user_logIn)
            imgId=getattr(special_user_object[0],"idslika").idslika
            special_user_img = Slike.objects.filter(idslika=imgId)
            user_data = {'username':getattr(user_object[0], "korisnickoime"),
                         'name':getattr(user_object[0],"ime"),
                         'surname':getattr(user_object[0],"prezime"),
                         'lvl':userLVL,
                         'diets': [dijeta_to_dict(x) for x in user_object],
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

            max_proizvod_id = Proizvod.objects.aggregate(Max('idproizvod', default = '0'))['idproizvod__max']

            proizvod_data = {
                'idproizvod': max_proizvod_id + 1,
                'imeproizvod': request.data.get('Productname'),
                'energijapr': float(request.data.get('Calories')),
                'masnocepr': float(request.data.get('Fats')),
                'bjelancevinepr': float(request.data.get('Protein')),
                'ugljikohidratipr': float(request.data.get('Carbohydrates')),
                'solpr': float(request.data.get('Salt')),
                'masapr': float(request.data.get('Mass')),
                'zmkiselinepr': float(request.data.get('Acids')),
                'seceripr': float(request.data.get('Sugars')),
                'idslika': max_slike_id + 1,
            }

            if slika_serializer.is_valid():

                slika_serializer.save()
                proizvod_serializer = ProizvodSerializer(data=proizvod_data)
                if proizvod_serializer.is_valid():
                    proizvod_serializer.save()
                    return Response({'success': True}, status=status.HTTP_201_CREATED)

                return Response({'error': slika_serializer.errors or proizvod_serializer.errors},status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': slika_serializer.errors or proizvod_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

class Dietview(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def addDiet(request):
        if request.method== 'POST':
            diet_data={
                'imedijeta': request.data.get('DietName'),
                'minenergija': request.data.get('MinCals'),
                'maxenergija': request.data.get('MaxCals'),
                'opis': request.data.get('Desc'),
                'minuglkjikohidrati': request.data.get('MinCarbs'),
                'maxugljikohidrati': request.data.get('MaxCarbs'),
                'minmasnoce': request.data.get('MinFats'),
                'maxmasnoce': request.data.get('Maxfats'),
                'minzmkiseline': request.data.get('MinAcids'),
                'maxzmkiseline': request.data.get('MaxAcids'),
                'minseceri': request.data.get('MinSugars'),
                'maxseceri': request.data.get('MaxSugars'),
                'minbjelancevine': request.data.get('MinProtein'),
                'maxbjelancevine': request.data.get('MaxProtein'),
                'dnevnimaxenergija': request.data.get('DailyMaxCals'),
                'dnevnimaxugljikohidrati': request.data.get('DailyMaxCarbs'),
                'dnevnimaxmasnoce': request.data.get('DailyMaxFats'),
                'dnevnimaxseceri': request.data.get('DailyMaxSugar'),
                'dnevnimaxzmkiseline': request.data.get('DailyMaxAcids'),
                'dnevnimaxbjelancevine': request.data.get('DailyMaxProtein'),
            }
            djeta_serializer= DijetaSerializer(data=diet_data)
            if djeta_serializer.is_valid():
                djeta_serializer.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': djeta_serializer.errors}, status= status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def getProfile(request):
        user_data = request.data.get('UserName')
        user_object = Korisnik.objects.filter(korisnickoime=user_data)
        
        if (user_object.exists()):
            userLVL = getattr(user_object[0], "razinaprivilegije")
            userLVL = abs(userLVL)
            if (userLVL == 1):
                user_data_ret = {'username' : getattr(user_object[0], "korisnickoime"),
                             'name' : getattr(user_object[0],"ime"),
                             'surname' : getattr(user_object[0],"prezime"),
                             'lvl' : userLVL,
                             'valid' : True}
                
            if (userLVL == 2 or userLVL == 3):
                special_user_object = Privilegiranikorisnik.objects.filter(korisnickoime=user_data)
                imgId = getattr(special_user_object[0],"idslika").idslika
                special_user_img = Slike.objects.filter(idslika=imgId)
                user_data_ret = {'username' : getattr(user_object[0], "korisnickoime"),
                             'name' : getattr(user_object[0],"ime"),
                             'surname' : getattr(user_object[0],"prezime"),
                             'lvl' : userLVL,
                             'slika' : ImgOperations.byteToString(getattr(special_user_img[0],"slika")), #ImageOperations je napravljena klasa!
                             'bio' : getattr(special_user_object[0],"biografija"),
                             'kuharica' : [[getattr(x, "idkuharica"), getattr(x, "naslov")] for x in Kuharica.objects.raw(
                                          """
                                          SELECT "Kuharica"."IDKuharica",
                                                 "Kuharica"."Naslov"
                                          FROM "Kuharica"
                                          WHERE "Kuharica"."KorisnickoIme" = \'"""+user_data+"""\';"""
                             )],
                             'recept' : [[getattr(x, "idrecept"), getattr(x, "imerecept")] for x in Recept.objects.raw(
                                          """
                                          SELECT "Recept"."IDrecept",
                                                 "Recept"."ImeRecept"
                                          FROM "Recept"
                                          WHERE "Recept"."KorisnickoIme" = \'"""+user_data+"""\';"""
                             )],
                             'valid' : True}
            
            return JsonResponse(user_data_ret)    
            
        else:
            return JsonResponse({'valid': False})

    @api_view(['POST', 'GET'])
    def isFollowing(request):
        user1 = request.data.get('UserName1')
        user2 = request.data.get('UserName2')
        user_object = Pratikorisnika.objects.filter(korisnickoime_1 = user1, korisnickoime_2 = user2)
        if user_object:
            return JsonResponse({'follows': True})
        else:
            return JsonResponse({'follows': False})

    @api_view(['POST', 'GET'])
    def followUser(request):
        user1 = request.data.get('UserName1')
        user2 = request.data.get('UserName2')
        user_object = Pratikorisnika.objects.filter(korisnickoime_1 = user1, korisnickoime_2 = user2)
        if user_object:
            return JsonResponse({'follows': True})
        else:
            pk_data = {'korisnickoime_1' : user1,
                       'korisnickoime_2' : user2,
            }
            pk_serializer= PratikorisnikaSerializer(data = pk_data)
            if pk_serializer.is_valid():
                pk_serializer.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': pk_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

    @api_view(['POST', 'GET'])
    def unFollowUser(request):
        user1 = request.data.get('UserName1')
        user2 = request.data.get('UserName2')
        user_object = Pratikorisnika.objects.filter(korisnickoime_1 = user1, korisnickoime_2 = user2)
        if user_object:
            Pratikorisnika.objects.filter(korisnickoime_1 = user1, korisnickoime_2 = user2).delete()
           
        return JsonResponse({'follows': False})

class CommentView(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def getComents(request):
        if(request.data.get("type")=='kuharica'):
            comments = [
                [getattr(x, "idkomentarkuharica"),
                 getattr(x, "korisnickoime_id"),
                 getattr(x, "ocjenak"),
                 getattr(x,"sadrzajkomentarak"),
                 getattr(x, "odgovornakomentark"),
                 ]for x in KomentarKuharica.objects.filter(idkuharica=request.data.get("idsub")).order_by("-idkomentarkuharica")
            ]

            entuzijast = [getattr(x, "korisnickoime_id") for x in Kuharica.objects.filter(idkuharica = request.data.get("idsub"))]
            data = {'comments': comments, 'entuzijast': entuzijast[0]}
            return JsonResponse(data, status=status.HTTP_200_OK)
        elif(request.data.get("type")=='recept'):
            
            comments = [
                [getattr(x, "idkomentarrecept"),
                 getattr(x, "korisnickoime_id"),
                 getattr(x, "ocjenar"),
                 getattr(x,"sadrzajkomentarar"),
                 getattr(x, "odgovornakomentarr"),
                 ]for x in KomentarRecept.objects.filter(idrecept=request.data.get("idsub")).order_by("-idkomentarrecept")
            ]

            entuzijast = [getattr(x, "korisnickoime_id") for x in Recept.objects.filter(idrecept = request.data.get("idsub"))]
            data = {'comments': comments, 'entuzijast': entuzijast[0]}
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'valid':False}, status=status.HTTP_404_NOT_FOUND)
        
    @api_view(['POST', 'GET'])
    def saveComment(request): #(id,type,uname,commtent,ocjena)
        req_data=request.data
        print(req_data)
        if(req_data.get("type")=='recept'):
            max_comentid = KomentarRecept.objects.aggregate(Max('idkomentarrecept', default = '0'))['idkomentarrecept__max']
            com_data={
                'idkomentarrecept':max_comentid+1,
                'idrecept':req_data.get("id"),
                'korisnickoime' :req_data.get("uname"),
                'sadrzajkomentarar' : req_data.get("comment"),
                'odgovornakomentarr': None,
                'ocjenar':req_data.get("ocjena"),
            }
            commentSerialiser = KomentarreceptSerializer(data=com_data)
            if(commentSerialiser.is_valid()):
                commentSerialiser.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': commentSerialiser.errors}, status= status.HTTP_400_BAD_REQUEST)
        elif(req_data.get("type")=='kuharica'):
            max_comentid = KomentarKuharica.objects.aggregate(Max('idkomentarkuharica', default = '0'))['idkomentarkuharica__max']
            com_data={
                'idkomentarkuharica':max_comentid+1,
                'idkuharica':req_data.get("id"),
                'korisnickoime' :req_data.get("uname"),
                'sadrzajkomentarak' : req_data.get("comment"),
                'odgovornakomentark': None,
                'ocjenak':req_data.get("ocjena"),
            }
            commentSerialiser = KomentarkuharicaSerializer(data=com_data)
            if(commentSerialiser.is_valid()):
                commentSerialiser.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': commentSerialiser.errors}, status= status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': "error in adding coment"}, status= status.HTTP_400_BAD_REQUEST)
    @api_view(['POST', 'GET'])
    def addReply(request):  # data{type, idcom, content}
        req_data = request.data
        if req_data.get("type") == 'recept':
            try:
                comment = KomentarRecept.objects.get(idkomentarrecept=req_data.get("idcom"))
                comment.odgovornakomentarr = req_data.get("content")
                comment.save()
                return Response({'success': True}, status=status.HTTP_200_OK)
            except KomentarRecept.DoesNotExist:
                return Response({'error': "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
        elif req_data.get("type") == 'kuharica':
            try:
                comment = KomentarKuharica.objects.get(idkomentarkuharica=req_data.get("idcom"))
                comment.odgovornakomentark = req_data.get("content")
                comment.save()
                return Response({'success': True}, status=status.HTTP_200_OK)
            except KomentarKuharica.DoesNotExist:
                return Response({'error': "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': "error in adding reply"}, status=status.HTTP_400_BAD_REQUEST)


class ImgOperations:
    def byteToString(byteImg):
        stringImg = byteImg.decode('ascii')
        return stringImg
    
