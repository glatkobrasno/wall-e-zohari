from django.db import models
from .models import Oznake

class Dijeta(models.Model):
    imeDijeta = models.CharField(max_length=200, primary_key=True)
    opis = models.TextField()
    minEnergija = models.IntegerField()
    maxEnergija = models.IntegerField()
    minMasnoce = models.IntegerField()
    maxMasnoce = models.IntegerField()
    minZMKiseline = models.IntegerField()
    maxZMKiseline = models.IntegerField()
    minUgljikohidrati = models.IntegerField()
    maxUgljikohidrati = models.IntegerField()
    minSeceri = models.IntegerField()
    maxSeceri = models.IntegerField()
    minBjelancevine = models.IntegerField()
    maxBjelancevine = models.IntegerField()
    minSol = models.IntegerField()
    maxSol = models.IntegerField()
    dnevniMaxEnergija = models.IntegerField()
    dnevniMaxMasnoce = models.IntegerField()
    dnevniMaxZMKiseline = models.IntegerField()
    dnevniMaxUgljikohidrati = models.IntegerField()
    dnevniMaxSeceri = models.IntegerField()
    dnevniMaxBjelancevine = models.IntegerField()
    dnevniMaxSol = models.IntegerField()
    dodatneOznake = models.ManyToManyField(Oznake)


    #ime dijete
    def get_imeDijeta(self):
        return self.imeDijeta
    def set_imeDijeta(self,value):
        self.imeDijeta = value
        
    #opis
    def get_opis(self):
        return self.opis
    def set_opis(self,value):
        self.opis = value
        
    # min energija
    def get_minEnergija(self):
        return self.minEnergija
    def set_minEnergija(self,value):
        self.minEnergija = value
        
    # max energija
    def get_maxEnergija(self):
        return self.maxEnergija
    def set_maxEnergija(self,value):
        self.maxEnergija = value
        
    # min masnoce
    def get_minMasnoce(self):
        return self.minMasnoce
    def set_minMasnoce(self,value):
        self.minMasnoce = value
        
    # max masnoce
    def get_maxMasnoce(self):
        return self.maxMasnoce
    def set_maxMasnoce(self,value):
        self.maxMasnoce = value
        
    # min ZMKiseline
    def get_minZMKiseline(self):
        return self.minZMKiseline
    def set_minZMKiseline(self,value):
        self.minZMKiseline = value
        
    # max zmkiseline
    def get_maxZMKiseline(self):
        return self.maxZMKiseline
    def set_maxZMKiseline(self,value):
        self.maxZMKiseline = value
        
    # min ugljikohidrati
    def get_minUgljikohidrati(self):
        return self.minUgljikohidrati
    def set_minUgljikohidrati(self,value):
        self.minUgljikohidrati = value
        
    # max ugljikohidrati
    def get_maxUgljikohidrati(self):
        return self.maxUgljikohidrati
    def set_maxUgljikohidrati(self,value):
        self.maxUgljikohidrati = value
        
    # min seceri
    def get_minSeceri(self):
        return self.minSeceri
    def set_minSeceri(self,value):
        self.minSeceri = value
        
    # max seceri
    def get_maxSeceri(self):
        return self.maxSeceri
    def set_maxSeceri(self,value):
        self.maxSeceri = value
        
    # min bjelancevine
    def get_minBjelancevine(self):
        return self.minBjelancevine
    def set_minBjelancevine(self,value):
        self.minBjelancevine = value
        
    # max bjelancevine
    def get_maxBjelancevine(self):
        return self.maxBjelancevine
    def set_maxBjelancevine(self,value):
        self.maxBjelancevine = value
        
    # min sol
    def get_minSol(self):
        return self.minSol
    def set_minSol(self,value):
        self.minSol = value
        
    # max sol
    def get_maxSol(self):
        return self.maxSol
    def set_maxSol(self,value):
        self.maxSol = value
        
    # dnevni max energija
    def get_dnevniMaxEnergija(self):
        return self.dnevniMaxEnergija
    def set_dnevniMaxEnergija(self,value):
        self.dnevniMaxEnergija = value
        
    # dnevni max masnoce
    def get_dnevniMaxMasnoce(self):
        return self.dnevniMaxMasnoce
    def set_dnevniMaxMasnoce(self,value):
        self.dnevniMaxMasnoce = value
        
    # dnevni max zmkiseline
    def get_dnevniMaxZMKiseline(self):
        return self.dnevniMaxZMKiseline
    def set_dnevniMaxZMKiseline(self,value):
        self.dnevniMaxZMKiseline = value
        
    # dnevni max ugljikohidrati
    def get_dnevniMaxUgljikohidrati(self):
        return self.dnevniMaxUgljikohidrati
    def set_dnevniMaxUgljikohidrati(self,value):
        self.dnevniMaxUgljikohidrati = value
        
    # dnevni max seceri
    def get_dnevniMaxSeceri(self):
        return self.dnevniMaxSeceri
    def set_dnevniMaxSeceri(self,value):
        self.dnevniMaxSeceri = value
        
    # dnevni max bjelancevine
    def get_dnevniMaxBjelancevine(self):
        return self.dnevniMaxBjelancevine
    def set_dnevniMaxBjelancevine(self,value):
        self.dnevniMaxBjelancevine = value
        
    # dnevni max soli
    def get_dnevniMaxSol(self):
        return self.dnevniMaxSol
    def set_dnevniMaxSol(self,value):
        self.dnevniMaxSol = value
        
    # dodatne oznake
    def dodaj_oznaka(self, oznaka):
        self.dodatneOznake.add(oznaka)
    def ukloni_oznaka(self, oznaka):
        self.dodatneOznake.remove(oznaka)
    def get_dodatneOznake(self):
        return self.dodatneOznake