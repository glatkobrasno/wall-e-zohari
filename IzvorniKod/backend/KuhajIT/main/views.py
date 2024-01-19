
from django.shortcuts import render
#added-----------------------------------------
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Max
from .serializers import *
from django.contrib.auth.hashers import check_password
import json
#added------------------------------------------
from .models import *

#utility imports
from obrada_slika.image_operations import ImgOperations
from datetime import *
from qr_codes import qr_codes
from security import security




def index(request):
    return render(request, 'index.html')

class SignUpView(serializers.Serializer): # klasa za obradu requestova za SignUp
    @api_view(['POST', 'GET'])
    def sign_up_save(request): # geting data from react data(Name, Surname, Email, UserName, Password, PasswordC, Bio, Img, ImgName, ImgType, Roll)
        if request.method == 'POST':
            role = request.data.get('Roll')
            if role == 'LVL1':
                lozinka, salt = security.hash_password(request.data.get('Password'))
                korisnik_data = {
                    'korisnickoime': request.data.get('UserName'),
                    'lozinka': lozinka,
                    'salt': salt,
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
                    'idslika' : max_slike_id + 1,
                }

                lozinka, salt = security.hash_password(request.data.get('Password'))
                korisnik_data = {
                    'korisnickoime': privilegirani_data['korisnickoime'],
                    'lozinka': lozinka,
                    'ime': request.data.get('Name'),
                    'prezime': request.data.get('Surname'),
                    'razinaprivilegije': -2 if role == 'LVL2' else -3,
                    'salt': salt,
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
                        return Response({'error': privilegirani_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': slika_serializer.errors or korisnik_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
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
            passfield = getattr(user_object[0], "lozinka", None) #TODO //updatati login, check za password
            salt = getattr(user_object[0], "salt")
            return JsonResponse({'valid': security.hash_password_with_salt(user_data[1], salt) == passfield})
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

    @api_view(['POST', 'GET'])
    def get_products_from_recipe(request):# <= idrecept => list of dicts with IDrecept, ImeProizvod, Kolicina
        rcpe=request.data.get('recipeID')
        data_proizvodi=[
            {
            'IDrecept': getattr(PotrebniSastojci_data,"idrecept").idrecept,
            'ImeProizvod': getattr(PotrebniSastojci_data,"idproizvod").imeproizvod,
            'Kolicina': getattr(PotrebniSastojci_data,"kolicina")
            }for PotrebniSastojci_data in Potrebnisastojci.objects.filter(idrecept=rcpe).order_by('idproizvod')
        ]
        return JsonResponse({"Returned_Data":data_proizvodi})

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

    @api_view(['POST', 'GET'])
    def get_all_diets(request):
        diets = [[getattr(x,"imedijeta"),getattr(x,"opis")] for x in Dijeta.objects.all()]
        data= { 'diets': diets}
        return JsonResponse(data, status=status.HTTP_200_OK)

    @api_view(['POST', 'GET'])
    def alter_diet(request):
        user=request.data.get("UserName")
        diet=request.data.get("SelectedDiet")
        #print(user,diet)
        #to_update=Korisnik.objects.get(korisnickoime=user)
        #print(to_update.imedijeta)
        #diet2=Dijeta.objects.get(imedijeta=diet)
        #print(diet2.imedijeta)
        #to_update.imedijeta=diet2
        #to_update.save()
        Korisnik.objects.filter(korisnickoime=user).update(imedijeta=diet)

        return Response(user , status=status.HTTP_200_OK)




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
        #else:
        #    pk_data = {'korisnickoime_1' : user1,
        #               'korisnickoime_2' : user2,
        #    }
        #    pk_serializer = PratikorisnikaSerializer(data = pk_data)
        #    if pk_serializer.is_valid():
        #        pk_serializer.save()
        #        return Response({'success': True}, status=status.HTTP_201_CREATED)
        #    else:
        #       return Response({'error': pk_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        else:

            temp1=Korisnik.objects.filter(korisnickoime=user1).first()
            temp2=Korisnik.objects.filter(korisnickoime=user2).first()
            to_insert=Pratikorisnika(korisnickoime_1 = temp1, korisnickoime_2 = temp2)
            to_insert.save()
            return Response(status=status.HTTP_201_CREATED)



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

class Cookbook(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def get_cookbookdata(request):
        req_data = request.data

        cbid = req_data.get("cookbookID")
        x = Kuharica.objects.filter(idkuharica=cbid).order_by("datumizrade")[0]
        data1 = [getattr(x,"tema"),
                getattr(x,"naslov"),
                getattr(x,"datumizrade"),
                getattr(x,"korisnickoime_id")
                ]
        x2 = Privilegiranikorisnik.objects.filter(korisnickoime=data1[3])[0]
        data2 = getattr(x2,"idslika_id")
        x3 = Slike.objects.filter(idslika=data2)[0]
        data3 = getattr(x3,"slika")
        data = {"tema":data1[0], 
                "naslov":data1[1],
                "datumizrade":data1[2],
                "korisnickoime_id":data1[3],
                "slika":ImgOperations.byteToString(data3)}
        #print(data)
        return JsonResponse(data, status=status.HTTP_200_OK)
    @api_view(['POST', 'GET'])
    def get_cookbooks(request):# <= i num of entrys => idcookbook, nemacookbook, typecookbook, entuziastname, entuziastIMG 
        num=request.data.get('num')
        data_kuharicae=[
            {
            'idkuh': getattr(x,"idkuharica"),
            'naslov': getattr(x, "naslov"),
            'datum': getattr(x,"datumizrade"),
            'entuziast': getattr(x,"korisnickoime_id"),
            'tema':getattr(x,"tema"),
            }for x in Kuharica.objects.order_by("-idkuharica")
        ]
        for i, x in enumerate(data_kuharicae):
            priv_obj=Privilegiranikorisnik.objects.filter(korisnickoime=x['entuziast'])[0]
            data_kuharicae[i]['slika'] = ImgOperations.byteToString(getattr(priv_obj, "idslika").slika)

        for i, x in enumerate(data_kuharicae):
            if(num>0):
                if(i>=num):
                    break
        return JsonResponse({'kuharice':data_kuharicae}, status=status.HTTP_200_OK)

class Recipe(serializers.Serializer):
    
    @api_view(['POST', 'GET'])
    def get_recipedata(request):# => recipeID  <= idrecept,imerecept,velicinaporcija,vrijemepripreme,datumizrade,korisnickoime,slikaautor
        req_data = request.data
        rpid = req_data.get("recipeID")

        x = Recept.objects.filter(idrecept=rpid)[0]
        data1 = [getattr(x,"idrecept"),
                getattr(x,"imerecept"),
                getattr(x,"velicinaporcija"),
                getattr(x,"vrijemepripreme"),
                getattr(x,"datumizrade"),
                getattr(x,"korisnickoime_id"),
                ]
        x2 = Privilegiranikorisnik.objects.filter(korisnickoime=data1[5])[0]
        data2 = getattr(x2,"idslika_id")
        x3 = Slike.objects.filter(idslika=data2)[0]
        data3 = getattr(x3,"slika")
        data = {"idrecept":data1[0], 
                "imerecept":data1[1],
                "velicinaporcija":data1[2],
                "vrijemepripreme":data1[3],
                "datumizrade":data1[4],
                "korisnickoime":data1[5],
                "slikaautor":ImgOperations.byteToString(data3)}
        return JsonResponse(data)

    @api_view(['POST', 'GET'])
    def get_recipes_from_cookbook(request):# <= idkuharica => idrecipe, zadnja slika
        kuh=request.data.get('cookbookID')
        print(kuh)
        data_recepti=[
            {
            'IDrecept': getattr(sadrzi_data,"idrecept").idrecept,
            'Imerecept': getattr(sadrzi_data,"idrecept").imerecept,
            'Velicinaporcija': getattr(sadrzi_data,"idrecept").velicinaporcija,
            'Vrijemepripreme': getattr(sadrzi_data,"idrecept").vrijemepripreme,
            'Datumizrade': getattr(sadrzi_data,"idrecept").datumizrade,
            }for sadrzi_data in Sadrzi.objects.filter(idkuharica=kuh)
        ]
        for indx,individual_recept_data in enumerate(data_recepti):
            specific_recept_id = individual_recept_data['IDrecept']
            individual_korak_data=Korak.objects.filter(idrecept=specific_recept_id).order_by("-idslika")[0]
            trazena_slika= getattr(individual_korak_data,"idslika").slika
            data_recepti[indx]['Slika'] = ImgOperations.byteToString(trazena_slika)
        return JsonResponse({"Returned_Data":data_recepti})
    @api_view(['POST', 'GET'])
    def get_recipes_with(request):
        req_data=request.data #img base64
        b64Img = req_data.get('slika')
        ImgOperations.b64ToImage(b64Img)
        resaut_qr=qr_codes.read_code("temporary/temporary.png")
        if(resaut_qr==None):
            return JsonResponse({'recepti':None},status=status.HTTP_404_NOT_FOUND)
        red_code=json.loads(resaut_qr) #"{\"id_of_product\": id}"
        try:
            recipe_with_data=[
                {'idrecept': getattr(sastojci,"idrecept").idrecept,
                'imerecept': getattr(sastojci,"idrecept").imerecept,
                'vrijemePripreme': getattr(sastojci,"idrecept").vrijemepripreme,
                'entuziast': getattr(sastojci,"idrecept").korisnickoime_id
                }for sastojci in Potrebnisastojci.objects.filter(idproizvod=red_code['id_of_product'])
            ]
            for i,_ in enumerate(recipe_with_data):
                slika = Korak.objects.filter(idrecept = recipe_with_data[i]['idrecept']).order_by("-idslika")[0]
                recipe_with_data[i]['slika'] = ImgOperations.byteToString(getattr(slika,"idslika").slika) 
            return JsonResponse({'recepti':recipe_with_data},status=status.HTTP_200_OK)
        except:
            return Response(data="Problem u receptima S...", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(['POST', 'GET'])
    def markRecipe(request):
        user=request.data.get('UserName')
        temp=Korisnik.objects.filter(korisnickoime=user).first()
        recipe=request.data.get('RecipeID')
        temp2=Recept.objects.filter(idrecept=recipe).first()
        print(temp2,recipe)
        #try:
        to_put=Konzumirao(korisnickoime=temp, idrecept=temp2, datum=datetime.today())
        to_put.save()
        return  Response(status=status.HTTP_200_OK)
        #except:
            #return  Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Step(serializers.Serializer):

    @api_view(['POST', 'GET'])
    def get_steps_from_recipe(request):# <= idrecept => list of dicts with IDrecept, IDslika, Slika, Opissl, Opiskorak
        rcpe=request.data.get('recipeID')
        data_koraci=[
            {
            'IDrecept': getattr(Korak_data,"idrecept").idrecept,
            'IDslika': getattr(Korak_data,"idslika_id"),
            'Slika': ImgOperations.byteToString(getattr(Korak_data,"idslika").slika),
            'Opissl': getattr(Korak_data,"opissl"),
            'Opiskorak': getattr(Korak_data,"opiskorak")
            }for Korak_data in Korak.objects.filter(idrecept=rcpe).order_by('idslika')
        ]
        return JsonResponse({"Returned_Data":data_koraci})

class HistoryView:

    @api_view(['POST', 'GET'])
    def getHistory(request):
        user_data = request.data.get('UserName')
        history_data = Konzumirao.objects.filter(korisnickoime = user_data)

        return JsonResponse(history_data)

    @api_view(['POST', 'GET'])
    def addToHistory(request):

        k_data = {'korisnickoime' : request.data.get('username'),
                  'idrecept' : request.data.get('recept'),
                  'datum' : date.today(),
                  }
        
        k_serializer= KonzumiraoSerializer(data = k_data)
        if k_serializer.is_valid():
            k_serializer.save()
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': k_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

    @api_view(['POST', 'GET'])
    def getGraphData():
        user_data = request.data.get('UserName')
        history_data = Konzumirao.objects.filter(korisnickoime = user_data, datum__gt = date.today() - timedelta(deys = 30))

        nut_per_day = [{"energija" : 0, "masnoce" : 0, "bjelancevine" : 0, "ugljikohidrati" : 0, "seceri" : 0, "sol" : 0, }] * 30
        
        for his in history_data:
            rec_data = Potrebnisastojci.objects.filter(idrecept = his["idrecept"])
            index = timedelta(deys = 30) - (date.today() - history_data["datum"])
            index = index.days
            for prod in rec_data:
                


class CookbookView(serializers.Serializer):
    @api_view(['GET','POST'])
    def addCookbook(request):
        if request.method == 'POST':
            # Get data from the request
            max_kuharica_id = Kuharica.objects.aggregate(Max('idkuharica', default = '0'))['idkuharica__max']

            cookbook_data = {
                'idkuharica': max_kuharica_id + 1,
                'naslov': request.data.get('CookbookName'),
                'tema': request.data.get('CookbookTheme'),
                'datumizrade': request.data.get('CreationDate'),
                'korisnickoime': request.data.get('Username'),  # Assuming user information is provided in the request
                # Add other cookbook data fields as needed
            }

            # Serialize the data
            cookbook_serializer = KuharicaSerializer(data=cookbook_data)

            # Validate and save the cookbook data
            if cookbook_serializer.is_valid():
                cookbook_serializer.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': cookbook_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)


class RecipeView(serializers.Serializer):
    @api_view(['POST', 'GET'])
    def addRecipe(request):
        if request.method == 'POST':
            # Get the current maximum IDrecept
            max_recipe_id = Recept.objects.aggregate(Max('idrecept', default='0'))['idrecept__max']

            # Convert 'datumizrade' to the correct date format
            submission_date_str = request.data.get('submissionDate')
            submission_date = datetime.strptime(submission_date_str, '%d/%m/%Y').strftime('%Y-%m-%d')


            recipe_data = {
                'idrecept': max_recipe_id + 1,
                'imerecept': request.data.get('recipeName'),
                'velicinaporcija': int(request.data.get('portionSize')),
                'vrijemepripreme': request.data.get('cookingTime'),
                'datumizrade': submission_date, 
                'korisnickoime': request.data.get('username'),  # Assuming user information is provided in the request
                # Add other cookbook data fields as needed
                }
            recipe_serializer = ReceptSerializer(data = recipe_data)
            #print("spremanje recepata")
            #print(recipe_serializer.is_valid())
            #print(recipe_data)
            if recipe_serializer.is_valid():
                recipe_serializer.save()
                #return Response({'success': True}, status=status.HTTP_201_CREATED)
            else:
                print("Serializer Errors:", recipe_serializer.errors)
                return Response({'error': recipe_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
            #print("recept gotov, sad sastojci")
            
            ingredients_str = request.data.get('ingredients')
            ingredients = json.loads(ingredients_str) if ingredients_str else []
            print(ingredients)

            #print(type(ingredients))
            # Process ingredients
            for ingredient_data in ingredients:
                #print(type(ingredient_data))
                ingredient_name = ingredient_data['name']
                ingredient_quantity = ingredient_data['quantity']
                ingredient_id = [getattr(proiz,"idproizvod")for proiz in Proizvod.objects.filter(imeproizvod = ingredient_name)][0]
                #print(ingredient_id)
                ing_data = {
                    'idrecept': max_recipe_id + 1,
                    'idproizvod': ingredient_id,
                    'kolicina': ingredient_quantity,
                    }
                try:
                    ptb_sav=Potrebnisastojci(
                        idrecept=Recept.objects.get(idrecept=ing_data['idrecept']),
                        idproizvod=Proizvod.objects.get(idproizvod=ing_data['idproizvod']),
                        kolicina = ing_data['kolicina'],
                        )
                    ptb_sav.save()
                    
                except:
                    return Response({'error': "errror in Ingredient add"}, status=status.HTTP_400_BAD_REQUEST)
            
                
            #print("---------------------------------------------")
            
            
            
            steps_str = request.data.get('cookingSteps')
            #print(steps_str)
            steps = json.loads(steps_str) if steps_str else []
            #print(steps)

            # Process cooking steps
            for step_data in steps:
                #print(step_data)
                
                # Save koraci
                max_image_id = Slike.objects.aggregate(Max('idslika', default='0'))['idslika__max']
                print(max_image_id)
                #print(max_image_id)
                
                
                # Save image to Slike table

                
                img_data = {
                    'idslika': max_image_id + 1,
                    'slika': step_data['image'],
                    }
                img_serializer = SlikeSerializer(data = img_data)
                #print("spremanje recepata")
                #print(recipe_serializer.is_valid())
                #print(recipe_data)
                if img_serializer.is_valid():
                    img_serializer.save()
                #return Response({'success': True}, status=status.HTTP_201_CREATED)
                else:
                    print("Serializer Errors:", img_serializer.errors)
                    return Response({'error': img_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
                
                korak_data = {
                    'idrecept': max_recipe_id+1,
                    'idslika': max_image_id+1,
                    'opissl': step_data['imageDescription'],
                    'opiskorak': step_data['description'],
                    # Add other cookbook data fields as needed
                }
                try:
                    korak_save=Korak(
                        idrecept=Recept.objects.get(idrecept=korak_data['idrecept']),
                        idslika=Slike.objects.get(idslika=korak_data['idslika']),
                        opissl=korak_data['opissl'],
                        opiskorak=korak_data['opiskorak']
                    )
                    #print(korak_save.objects.all())
                    korak_save.save()
                    
                    #return Response({'success': True}, status=status.HTTP_201_CREATED)
                except Recept.DoesNotExist:
                 return Response({'error': "Recept does not exist"}, status=status.HTTP_404_NOT_FOUND)
                except Slike.DoesNotExist:
                    return Response({'error': "Slike does not exist"}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    return Response({'error': f"Error in saving Korak: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
                #print("KOrak")
            
            
            idcookbook = request.data.get('idcookbook')
            print(idcookbook)
            rec_data = {
                'idrecept': max_recipe_id + 1,
                'idkuharica': idcookbook,
                } 
            print(rec_data)
            sadrzi_serializer = SadrziSerializer(data = rec_data)
            
            if sadrzi_serializer.is_valid():
                sadrzi_serializer.save()
            else:
                print("Serializer Errors:", sadrzi_serializer.errors)
                return Response({'error': sadrzi_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'success': True}, status=status.HTTP_201_CREATED)

        else:
            return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
