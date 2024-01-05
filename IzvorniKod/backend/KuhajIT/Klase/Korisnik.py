from django.db import models

class Korisnik(models.Model):
    korisnickoIme = models.CharField(max_length=50, primary_key=True)
    lozinka = models.CharField(max_length=200)
    ime = models.CharField(max_length=50)
    prezime = models.CharField(max_length=50)
    imeDijeta = models.CharField(max_length=50)
    razinaPrivilegije = models.IntegerField(default=0)
    #ovdje vjerojatno fali korisnicko ime drugog korisnika 
    #kojeg trenutni korisnik prati (i vezane funkcije)
    
    #pratiKorisnika = models.ManyToManyField(Korisnik)
    
    def __str__(self):
        return f"{self.ime} {self.prezime}"
    
    #Korisnicko ime
    def get_korisnicko_ime(self):
        return self.korisnickoIme
    
    def set_korisnicko_ime(self, novoKorisnickoIme):
        self.korisnickoIme = novoKorisnickoIme
        
    #lozinka
    def get_lozinka(self):
        return self.lozinka
    
    # Promjena lozinke zahtjeva staru i novu lozinku
    def set_lozinka(self, staraLozinka, novaLozinka):
        if self.lozinka == staraLozinka:
            self.lozinka = novaLozinka
            return True
        else:
            return False
    
    #Ime
    def get_ime(self):
        return self.ime
    
    def set_ime(self, novoIme):
        self.ime = novoIme
        
    #Prezime
    def get_prezime(self):
        return self.prezime
    
    def set_rezime(self, novoPrezime):
        self.prezime = novoPrezime
        
    #Ime dijete
    def get_ime_dijete(self):
        return self.imeDijeta
    
    def set_ime_dijete(self, novoImeDijete):
        self.imeDijeta = novoImeDijete
        
