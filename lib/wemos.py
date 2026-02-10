import requests
from datetime import datetime
from config.config import Config

def fetch_weather_data():
    print("Fetching weather data")
    try:
        req = requests.get(Config.WEMOS_IP_URL, timeout=5)
        return req.json() if req.status_code == 200 else None
    except Exception as err:
        print(f"Error: {err}")

def process_weather_data(raw_data):
    if not raw_data: return None

    return {
        "timestamp": datetime.now().isoformat(),
        "values": {
            "temp": raw_data["temperature"],
            "humidity": raw_data["humidity"],
            "pressure": raw_data["pressure"],
        }
    }