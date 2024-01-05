from django.db import models
from .models import Korisnik

class PrivilegiraniKorisnik(Korisnik):
    email = models.CharField(200)
    biografija = models.TextField()
    slika = models.ImageField(upload_to='images/', null=True, blank=True)
    #ovdje vjerojatno fali lista recepata / kuharica / dijeta 
    #koje korisnik napravi (i vezane funkcije)
    
    
    def __str__(self):
        return f"{self.ime} {self.prezime}"
    
    #email
    def get_email(self):
        return self.email
    
    def set_email(self, noviEmail):
        self.email = noviEmail
        
    #biografija
    def get_biografija(self):
        return self.biografija
    
    def set_biografija(self, novaBiografija):
        self.biografija = novaBiografija
        
    #slika
    def get_slika(self):
        return self.slika
    
    def set_slika(self, novaSlika):
        self.slika = novaSlika
        
        
        
    
