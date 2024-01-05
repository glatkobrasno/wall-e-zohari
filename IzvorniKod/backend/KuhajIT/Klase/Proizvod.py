from django.db import models
from .models import Oznake

class Proizvod(models.Model):
    idProizvod = models.IntegerField(primary_key=True)
    imeProizvod = models.CharField(max_length=200)
    energijaPr = models.IntegerField()
    masnocePr = models.IntegerField()
    bjelancevinePr = models.IntegerField()
    ugljikohidratiPr = models.IntegerField()
    solPr = models.IntegerField()
    masaPr = models.IntegerField()
    zmKiselinePr = models.IntegerField()
    seceriPr = models.IntegerField()
    idSlika = models.ImageField(upload_to='images/', null=True, blank=True)
    dodatneOznake = models.ManyToManyField(Oznake)
    
    
    def __str__(self):
        return f"{self.imeProizvod}"
    
    # ID proizvoda
    def get_idProizvod(self):
        return self.idProizvod

    def set_idProizvod(self, value):
        self.idProizvod = value

    #ime proizvoda
    def get_imeProizvod(self):
        return self.imeProizvod

    def set_imeProizvod(self, value):
        self.imeProizvod = value

    #energija
    def get_energijaPr(self):
        return self.energijaPr

    def set_energijaPr(self, value):
        self.energijaPr = value
        
    #masnoce
    def get_masnocePr(self):
        return self.masnocePr

    def set_masnocePr(self, value):
        self.masnocePr = value
        
    #bjelancevine
    def get_bjelancevinePr(self):
        return self.bjelancevinePr

    def set_bjelancePr(self, value):
        self.bjelancevinePr = value
        
    #ugljikohidrati
    def get_ugljikohidratiPr(self):
        return self.ugljikohidratiPr

    def set_ugljikohidratiPr(self, value):
        self.ugljikohidratiPr = value
        
    #sol
    def get_solPr(self):
        return self.solPr

    def set_solPr(self, value):
        self.solPr = value
        
    #masa
    def get_masaPr(self):
        return self.masaPr

    def set_masaPr(self, value):
        self.masaPr = value
        
    #zmKiseline
    def get_zmKiselinePr(self):
        return self.zmKiselinePr

    def set_zmKiselinePr(self, value):
        self.zmKiselinePr = value
        
    #seceri
    def get_seceriPr(self):
        return self.seceriPr

    def set_seceriPr(self, value):
        self.seceriPr = value
        
    #slika
    def get_idSlika(self):
        return self.idSlika

    def set_idSlika(self, value):
        self.idSlika = value
        
        
    
    # dodatne oznake
    def dodaj_oznaka(self, oznaka):
        self.dodatneOznake.add(oznaka)
    def ukloni_oznaka(self, oznaka):
        self.dodatneOznake.remove(oznaka)
    def get_dodatneOznake(self):
        return self.dodatneOznake