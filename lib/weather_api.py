import requests
from datetime import datetime
from config.config import Config

def req_outdoor_data():
    print("Fetching outdoor weather data")
    url = "https://api.open-meteo.com/v1/forecast?latitude=47.3975&longitude=8.008&hourly=temperature_2m,rain,wind_speed_10m,surface_pressure,relative_humidity_2m&models=meteoswiss_icon_ch1&timezone=Europe%2FBerlin&forecast_days=1"
    
    try:
        req = requests.get(url)
        return req.json() if req.status_code == 200 else None

    except Exception as err:
        print(f"Error: {err}")

def proccess_outdoor_weather_data(raw_data):
    print("proccess outdoor weather data")
    if raw_data is None or callable(raw_data):
        print("Error: raw_data in weather_api.py is not valid.")
        return None

    current_hour = datetime.now().hour
    hourly = raw_data["hourly"]

    return {
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "values": {
            "temp": hourly["temperature_2m"][current_hour],
            "humidity": hourly["relative_humidity_2m"][current_hour],
            "pressure": hourly["surface_pressure"][current_hour],
            "rain": hourly["rain"][current_hour],
            "wind_speed": hourly["wind_speed_10m"][current_hour]
        }
    }