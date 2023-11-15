import base64
import hashlib

from Crypto.Random import get_random_bytes


def fetchUserData(userName):
    """
        Function that gets the data from the database.
    :param userName: username
    :return: stored hash of a password formed <saltValue>:<hashedPassword>
    """
    # Yet to be implemented!
    pass


def authenticateUser(userName, password):
    """
        Function that hashes the given password and checks if it matches the hashed value stored in database.
    :param userName: username
    :param password: password
    :return: 1 if user is authenticated, 0 if hashes don't match.
    """
    userData = fetchUserData(userName).split(":")

    storedSalt = userData[1]
    storedHash = userData[2]

    hashed = hashPassword(password, salt=storedSalt)
    hashedPassword = hashed.split(":")[1]

    if hashedPassword == storedHash:
        return 1

    return 0


def hashPassword(password, salt=""):
    """
        Function that calculates hash value of given password. If no salt is given, it will generate random one.
    :param password: password to hash
    :param salt: salt
    :return: <saltValue>:<hashedPassword>
    """
    if not salt:
        salt = base64.b64encode(get_random_bytes(16)).decode('utf-8')

    rawSalt = salt.encode()

    rawPassword = password.encode()
    hashed = hashlib.sha256(rawSalt + rawPassword).hexdigest()

    return salt + ":" + hashed
