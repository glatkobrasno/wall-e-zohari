import bcrypt
import psycopg2
from psycopg2 import sql
# TODO: target tablica s korisnicima
def connect_to_database():
    # TODO: Ažuriraj spajanje
    parametri = {
        "dbname": "database_name",
        "user": "username",
        "password": "password",
        "host": "host",
        "port": "port"
    }

    try:
        connection = psycopg2.connect(**parametri)
        return connection
    except psycopg2.Error as e:
        print("Nisam se spojio s bazom.")
        print(e)
        return None

def hash_password(password):
    salt = bcrypt.gensalt() #  nasumični salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    return hashed_password, salt

def hash_password_with_salt(password, binary_salt):
    salt = binary_salt#.decode('utf-8')
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    print(hashed_password.decode('utf-8'))
    return hashed_password.decode('utf-8')

def store_password_in_database(username, hashed_password, salt):
    salt_binary=psycopg2.Binary(salt)
    # Spoji se
    connection = connect_to_database()
    if connection is None:
        return

    try:
        # Spremi usera, lozinku i salt u bazu
        with connection.cursor() as cursor:
            insert_query = sql.SQL("INSERT INTO Korisnik (KorisnickoIme, Lozinka, Salt) VALUES (%s, %s, %s)")
            cursor.execute(insert_query, (username, hashed_password, salt_binary))
        connection.commit()
        print("Lozinka spremljena u bazu.")
    except psycopg2.Error as e:
        print("Lozinka nije spremljena u bazu radi greške.")
        print(e)
    finally:
        connection.close()

def check_password_in_database(username, input_password):
    # Spoji se na bazu
    connection = connect_to_database()
    if connection is None:
        return False

    try:
        # Uzmi hashanu lozinku, usera i salt
        with connection.cursor() as cursor:
            cursor.execute("SELECT Lozinka, Salt FROM Korsnik WHERE KorisnickoIme LIKE %s", (username,))
            result = cursor.fetchone()

            if result:
                hashed_password_from_db, salt_binary = result
                salt=bytes(salt_binary)
                # Hashaj input
                hashed_input_password = bcrypt.hashpw(input_password.encode('utf-8'), salt)
                # Usporedi dva hasha
                return hashed_password_from_db == hashed_input_password
            else:
                # if not result -> user ne postoji u bazi
                return False
    except psycopg2.Error as e:
        print("Greška u provjeravanju lozinke u bazi.")
        print(e)
        return False
    finally:
        connection.close()

# ako je datoteka pozvana izravno
if "__name__"=="__main__":
    username = "ghostbusters"
    input_password = "kogadazovemo"


    hashed_password, salt = hash_password(input_password)
    store_password_in_database(username, hashed_password, salt)

    if check_password_in_database(username, input_password):
        print("Lozinka je točna.")
    else:
        print("Lozinka nije točna.")
