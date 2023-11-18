from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Max
from .models import Korisnik, Privilegiranikorisnik, Slike

# Create your views here.


from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')


def check_username(request): 
    if request.method == 'POST':
        username = request.POST.get('username') # u Reactu {username : data['UserName']}
        user_exists = Korisnik.objects.filter(username=username).exists()
        return JsonResponse({"taken" : user_exists}) #in React data.taken
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

def check_login(request):
    if request.method == 'POST':
        # Get username and password from the request data
        # #in React data={'UserName' : username.value, 'Password' : password.value,}
        username = request.POST.get('UserName') 
        password = request.POST.get('Password')
        checked = False
        korData = None
        if Korisnik.objects.filter(username=username).exists():
            korData=Korisnik.objects.filter(username=username)
            if (korData.first().korisnickoime == username and
                korData.first().lozinka == password):
                checked=True
        if checked:
            return JsonResponse({'correct': True}) #in React response.data.correct
        else:
            return JsonResponse({'correct': False})
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def save_signup(request): #request{Name, Surname, Email, UserName, Password, PasswordC, Bio, Img, ImgName, ImgType, Roll}
    if request.method == 'POST': 
        roll = request.POST.get('Roll')
        data = {
            'Name': request.POST.get('Name'),
            'Surname': request.POST.get('Surname'),
            'UserName': request.POST.get('UserName'),
            'Password': request.POST.get('Password'),
        }
        new_korisnik= Korisnik( # make new Korsinik 
            korisnickoime=data['UserName'],
            lozinka=data['Password'],
            ime=data['Name'],
            prezime=data['Surname'],
            razinaprivilegije=0,
        )
        if roll == 'LVL1':
            new_korisnik.razinaprivilegije=1
        elif roll == 'LVL2':
            new_korisnik.razinaprivilegije=-2 # negative till they get aproved from admin
        elif roll == 'LVL3':
            new_korisnik.razinaprivilegije=-3 # negative till they get aproved from admin
        new_korisnik.save()# save new Korisnik
        if roll == 'LVL2' or roll == 'LVL3': # if is PrKorisnik
            max_id = Slike.objects.all().aaggregate(Max('idslika'))['max_id'] # returns {'max_id' : val}
            new_slika = Slike(
                idslika = max_id['max_id']+1,
                slika = request.POST.get('Img'),
            )
            new_slika.save()
            new_privilegirani_korisnik = Privilegiranikorisnik( # make new PrKorisnik
                korisnickoime = Korisnik.objects.get(korisnickoime=data['UserName']),
                email = request.POST.get('Email'),
                biografija = request.POST.get('Bio'),
                idslika = max_id['max_id']+1
            )
            new_privilegirani_korisnik.save()# save new PrKorisnik
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Invalid request method'}, status=400)