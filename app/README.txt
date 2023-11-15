Ekipa, evo kostura za nas app. Za sad je app podijeljen u 2 "subapps", 
main i authentication.

Main app je app koji se treba otvorit kad se aplikacija starta, 
a trenutno sadrži 2 gumba koja linkaju na stranicu za login ili
registraciju.

Kako cemo ic dalje sa razvojem aplikacije cemo ili dodavat nove "subapps",
ili cemo vise funkcionalnosti koje su slicne dodati u postojeci app.

Sto se tice testiranja i pokretanja, pozicionirajte se u folder koji
sadrzi "manage.py". Taj file je bread and butter za sve sta treba radit.
server se pokrece komandom "python manage.py runserver", a smjesta se na
localhost na port 8000 po defaultu (nisam to mijenjao).

Za bilo kakva dodatna pitanje, guglajte ili se javite.

Frontend je zapocet (basic html unutar "templates" foldera, a javascript
bi trebao ici unutar "static" foldera na istoj razini, ali trenutno jos
nije omogucen u postavkama projekta (Ako se zelite igrat s tim, moze vam
i chatGPT pomoci).

Bazu koja se generirala automatski nisam ukljucio u commit s obzirom na
to da jos nismo sve rijesili po pitanju baze.