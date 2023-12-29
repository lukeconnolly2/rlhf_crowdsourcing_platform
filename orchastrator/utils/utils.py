from constants import SALT
import hashlib

def generate_api_key(user):
    return hashlib.sha256((user + SALT).encode()).hexdigest()