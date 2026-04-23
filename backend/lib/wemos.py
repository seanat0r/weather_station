import requests
import json
from datetime import datetime
from config.config import Config

def fetch_weather_data():
    print("Fetching weather data")
    try:
        req = requests.get(Config.WEMOS_IP_URL, timeout=5)
        if req.status_code == 200:
            raw_text = req.text
            cleaned_text = raw_text.replace("nan", "0.0")
            return json.loads(cleaned_text)
        return None
    except Exception as err:
        print(f"Error: {err}")
        return None

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