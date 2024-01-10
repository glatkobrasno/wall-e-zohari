# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Dijeta(models.Model):
    imedijeta = models.CharField(db_column='ImeDijeta', primary_key=True, max_length=200)  # Field name made lowercase.
    opis = models.CharField(db_column='Opis', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    minenergija = models.DecimalField(db_column='MinEnergija', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxenergija = models.DecimalField(db_column='MaxEnergija', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minmasnoce = models.DecimalField(db_column='MinMasnoce', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxmasnoce = models.DecimalField(db_column='MaxMasnoce', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minzmkiseline = models.DecimalField(db_column='MinZMKiseline', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxzmkiseline = models.DecimalField(db_column='MaxZMKiseline', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minugljikohidrati = models.DecimalField(db_column='MinUgljikohidrati', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxugljikohidrati = models.DecimalField(db_column='MaxUgljikohidrati', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minseceri = models.DecimalField(db_column='MinSeceri', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxseceri = models.DecimalField(db_column='MaxSeceri', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minbjelancevine = models.DecimalField(db_column='MinBjelancevine', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxbjelancevine = models.DecimalField(db_column='MaxBjelancevine', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    minsol = models.DecimalField(db_column='MinSol', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    maxsol = models.DecimalField(db_column='MaxSol', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxenergija = models.DecimalField(db_column='DnevniMaxEnergija', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxmasnoce = models.DecimalField(db_column='DnevniMaxMasnoce', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxzmkiseline = models.DecimalField(db_column='DnevniMaxZMKiseline', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxugljikohidrati = models.DecimalField(db_column='DnevniMaxUgljikohidrati', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxseceri = models.DecimalField(db_column='DnevniMaxSeceri', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxbjelancevine = models.DecimalField(db_column='DnevniMaxBjelancevine', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    dnevnimaxsol = models.DecimalField(db_column='DnevniMaxSol', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    class Meta:
        managed = False
        db_table = 'Dijeta'


class Dodatneoznake(models.Model):
    idozn = models.IntegerField(db_column='IDOzn', primary_key=True)  # Field name made lowercase.
    opisozn = models.CharField(db_column='OpisOzn', max_length=2048, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DodatneOznake'


class Komentarkuharica(models.Model):
    korisnickoime = models.OneToOneField('Korisnik', models.DO_NOTHING, db_column='KorisnickoIme', primary_key=True)  # Field name made lowercase. The composite primary key (KorisnickoIme, IDKuharica) found, that is not supported. The first column is selected.
    idkuharica = models.ForeignKey('Kuharica', models.DO_NOTHING, db_column='IDKuharica')  # Field name made lowercase.
    sadrzajkomentarar = models.CharField(db_column='SadrzajKomentaraR', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    odgovornakomentarr = models.CharField(db_column='OdgovorNaKomentarR', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    ocjenak = models.IntegerField(db_column='OcjenaK', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'KomentarKuharica'
        unique_together = (('korisnickoime', 'idkuharica'),)


class Komentarrecept(models.Model):
    korisnickoime = models.OneToOneField('Korisnik', models.DO_NOTHING, db_column='KorisnickoIme', primary_key=True)  # Field name made lowercase. The composite primary key (KorisnickoIme, IDrecept) found, that is not supported. The first column is selected.
    idrecept = models.ForeignKey('Recept', models.DO_NOTHING, db_column='IDrecept')  # Field name made lowercase.
    sadrzajkomentarar = models.CharField(db_column='SadrzajKomentaraR', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    odgovornakomentarr = models.CharField(db_column='OdgovorNaKomentarR', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    ocjenar = models.IntegerField(db_column='OcjenaR', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'KomentarRecept'
        unique_together = (('korisnickoime', 'idrecept'),)


class Konzumirao(models.Model):
    korisnickoime = models.OneToOneField('Korisnik', models.DO_NOTHING, db_column='KorisnickoIme', primary_key=True)  # Field name made lowercase. The composite primary key (KorisnickoIme, IDrecept) found, that is not supported. The first column is selected.
    idrecept = models.ForeignKey('Recept', models.DO_NOTHING, db_column='IDrecept')  # Field name made lowercase.
    datum = models.DateField(db_column='Datum', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Konzumirao'
        unique_together = (('korisnickoime', 'idrecept'),)


class Korak(models.Model):
    idrecept = models.OneToOneField('Recept', models.DO_NOTHING, db_column='IDrecept', primary_key=True)  # Field name made lowercase. The composite primary key (IDrecept, IDslika) found, that is not supported. The first column is selected.
    idslika = models.ForeignKey('Slike', models.DO_NOTHING, db_column='IDslika')  # Field name made lowercase.
    opissl = models.CharField(db_column='OpisSl', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    opiskorak = models.CharField(db_column='OpisKorak', max_length=2048, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Korak'
        unique_together = (('idrecept', 'idslika'),)


class Korisnik(models.Model):
    korisnickoime = models.CharField(db_column='KorisnickoIme', primary_key=True, max_length=50)  # Field name made lowercase.
    lozinka = models.CharField(db_column='Lozinka', max_length=200, blank=True, null=True)  # Field name made lowercase.
    ime = models.CharField(db_column='Ime', max_length=50, blank=True, null=True)  # Field name made lowercase.
    prezime = models.CharField(db_column='Prezime', max_length=50, blank=True, null=True)  # Field name made lowercase.
    imedijeta = models.ForeignKey(Dijeta, models.DO_NOTHING, db_column='ImeDijeta', blank=True, null=True)  # Field name made lowercase.
    razinaprivilegije = models.IntegerField(db_column='RazinaPrivilegije', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Korisnik'


class Kuharica(models.Model):
    idkuharica = models.IntegerField(db_column='IDKuharica', primary_key=True)  # Field name made lowercase.
    naslov = models.CharField(db_column='Naslov', max_length=200, blank=True, null=True)  # Field name made lowercase.
    datumizrade = models.DateField(db_column='DatumIzrade', blank=True, null=True)  # Field name made lowercase.
    korisnickoime = models.ForeignKey(Korisnik, models.DO_NOTHING, db_column='KorisnickoIme', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Kuharica'


class Oznakeproizvoda(models.Model):
    idproizvod = models.OneToOneField('Proizvod', models.DO_NOTHING, db_column='IDProizvod', primary_key=True)  # Field name made lowercase. The composite primary key (IDProizvod, IDOzn) found, that is not supported. The first column is selected.
    idozn = models.ForeignKey(Dodatneoznake, models.DO_NOTHING, db_column='IDOzn')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OznakeProizvoda'
        unique_together = (('idproizvod', 'idozn'),)


class Potrebnisastojci(models.Model):
    idrecept = models.OneToOneField('Recept', models.DO_NOTHING, db_column='IDrecept', primary_key=True)  # Field name made lowercase. The composite primary key (IDrecept, IDproizvod) found, that is not supported. The first column is selected.
    idproizvod = models.ForeignKey('Proizvod', models.DO_NOTHING, db_column='IDproizvod')  # Field name made lowercase.
    kolicina = models.DecimalField(db_column='Kolicina', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    class Meta:
        managed = False
        db_table = 'PotrebniSastojci'
        unique_together = (('idrecept', 'idproizvod'),)


class Pratikorisnika(models.Model):
    korisnickoime_1 = models.OneToOneField(Korisnik, models.DO_NOTHING, db_column='KorisnickoIme_1', primary_key=True)  # Field name made lowercase. The composite primary key (KorisnickoIme_1, KorisnickoIme_2) found, that is not supported. The first column is selected.
    korisnickoime_2 = models.ForeignKey(Korisnik, models.DO_NOTHING, db_column='KorisnickoIme_2', related_name='pratikorisnika_korisnickoime_2_set')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PratiKorisnika'
        unique_together = (('korisnickoime_1', 'korisnickoime_2'),)


class Privilegiranikorisnik(models.Model):
    korisnickoime = models.OneToOneField(Korisnik, models.DO_NOTHING, db_column='KorisnickoIme', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=200, blank=True, null=True)  # Field name made lowercase.
    biografija = models.CharField(db_column='Biografija', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    idslika = models.ForeignKey('Slike', models.DO_NOTHING, db_column='IDslika', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PrivilegiraniKorisnik'


class Proizvod(models.Model):
    idproizvod = models.IntegerField(db_column='IDproizvod', primary_key=True)  # Field name made lowercase.
    imeproizvod = models.CharField(db_column='ImeProizvod', max_length=200, blank=True, null=True)  # Field name made lowercase.
    energijapr = models.DecimalField(db_column='EnergijaPr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    masnocepr = models.DecimalField(db_column='MasnocePr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    bjelancevinepr = models.DecimalField(db_column='BjelancevinePr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    ugljikohidratipr = models.DecimalField(db_column='UgljikohidratiPr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    solpr = models.DecimalField(db_column='SolPr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    masapr = models.DecimalField(db_column='MasaPr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    zmkiselinepr = models.DecimalField(db_column='ZMKiselinePr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    seceripr = models.DecimalField(db_column='SeceriPr', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    idslika = models.ForeignKey('Slike', models.DO_NOTHING, db_column='IDslika', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Proizvod'


class Recept(models.Model):
    idrecept = models.IntegerField(db_column='IDrecept', primary_key=True)  # Field name made lowercase.
    imerecept = models.CharField(db_column='ImeRecept', max_length=200, blank=True, null=True)  # Field name made lowercase.
    velicinaporcija = models.IntegerField(db_column='VelicinaPorcija', blank=True, null=True)  # Field name made lowercase.
    vrijemepripreme = models.TimeField(db_column='VrijemePripreme', blank=True, null=True)  # Field name made lowercase.
    datumizrade = models.DateField(db_column='DatumIzrade', blank=True, null=True)  # Field name made lowercase.
    korisnickoime = models.ForeignKey(Korisnik, models.DO_NOTHING, db_column='KorisnickoIme', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Recept'


class Restrikcija(models.Model):
    imedijeta = models.OneToOneField(Dijeta, models.DO_NOTHING, db_column='ImeDijeta', primary_key=True)  # Field name made lowercase. The composite primary key (ImeDijeta, IDOzn) found, that is not supported. The first column is selected.
    idozn = models.ForeignKey(Dodatneoznake, models.DO_NOTHING, db_column='IDOzn')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Restrikcija'
        unique_together = (('imedijeta', 'idozn'),)


class Sadrzi(models.Model):
    idrecept = models.OneToOneField(Recept, models.DO_NOTHING, db_column='IDRecept', primary_key=True)  # Field name made lowercase. The composite primary key (IDRecept, IDKuharica) found, that is not supported. The first column is selected.
    idkuharica = models.ForeignKey(Kuharica, models.DO_NOTHING, db_column='IDKuharica')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Sadrzi'
        unique_together = (('idrecept', 'idkuharica'),)


class Slike(models.Model):
    idslika = models.IntegerField(db_column='IDslika', primary_key=True)  # Field name made lowercase.
    slika = models.CharField(db_column='Slika', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Slike'
