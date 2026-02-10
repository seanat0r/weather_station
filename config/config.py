import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    WEMOS_URL = os.getenv("WEMOS_URL")
    WEMOS_IP = os.getenv("IP")
    WEMOS_IP_URL = f"http://{WEMOS_IP}/data.json"

    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_DATABASE = os.getenv("DB_DATABASE")
    
    INTERVAL = int(os.getenv("INTERVAL", 5))