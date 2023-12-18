
from rest_framework import serializers
from .models import *
# from .models import YourModel


# class YourModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = YourModel
#         fields = '__all__'

class DijetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dijeta
        fields = '__all__'


class DodatneoznakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dodatneoznake
        fields = '__all__'


class KomentarkuharicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Komentarkuharica
        fields = '__all__'


class KomentarreceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Komentarrecept
        fields = '__all__'


class KonzumiraoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Konzumirao
        fields = '__all__'


class KorakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Korak
        fields = '__all__'


class KorisnikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Korisnik
        fields = '__all__'


class KuharicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kuharica
        fields = '__all__'


class OznakeproizvodaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oznakeproizvoda
        fields = '__all__'


class PotrebnisastojciSerializer(serializers.ModelSerializer):
    class Meta:
        model = Potrebnisastojci
        fields = '__all__'


class PratikorisnikaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pratikorisnika
        fields = '__all__'


class PrivilegiranikorisnikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Privilegiranikorisnik
        fields = '__all__'


class ProizvodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proizvod
        fields = '__all__'


class ReceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recept
        fields = '__all__'


class RestrikcijaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restrikcija
        fields = '__all__'


class SadrziSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sadrzi
        fields = '__all__'


class SlikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slike
        fields = '__all__'