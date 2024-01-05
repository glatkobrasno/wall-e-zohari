from django.db import models

class Oznaka(models.Model):
    idOznaka = models.IntegerField(primary_key=True)
    opisOznaka = models.TextField()
    
    def __str__(self):
        return f"Oznaka {self.idOznaka}"
    
    # id oznake
    def get_idOznaka(self):
        return self.idOznaka
    def set_idOznaka(self, value):
        self.idOznaka = value
        
    # opis oznake
    def get_opisOznaka(self):
        return self.opisOznaka
    def set_opisOznaka(self, value):
        self.opisOznaka = value
