from django.db import models
from .models import Proizvod

class Recept(models.Model):
    idRecept = models.IntegerField(primary_key=True)
    velicinaPorcija = models.IntegerField()
    vrijemePripreme = models.TimeField()
    datumIzrade = models.DateField()
    potrebniProizvodi = models.ManyToManyField(Proizvod)
    #treba nekako implementirati količinu proizvoda, 
    #vjerojatno stvorit novu klasu
    
    def __str__(self):
        return f"Recept {self.idRecept}"
    
    # id recept
    def get_idRecept(self):
        return self.idRecept
    def set_idRecept(self,value):
        self.idRecept = value

    # velicina porcija
    def get_velicinaPorcija(self):
        return self.velicinaPorcija
    def set_velicinaPorcija(self,value):
        self.velicinaPorcija= value
        
    # vrijeme pripreme
    def get_vrijemePripreme(self):
        return self.vrijemePripreme
    def set_vrijemePripreme(self,value):
        self.vrijemePripreme = value
        
    # datum izrade
    def get_datumIzrade(self):
        return self.datumIzrade
    def set_datumIzrade(self,value):
        self.datumIzrade = value

    # proizvodi
    
    def dodaj_proizvod(self, proizvod):
        self.proizvodi.add(proizvod)

    def ukloni_proizvod(self, proizvod):
        self.proizvodi.remove(proizvod)
    def get_potrebniProizvodi(self):
        return self.potrebniProizvodi