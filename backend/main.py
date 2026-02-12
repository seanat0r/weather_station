import time
from config.config import Config
from lib.database import DatabaseManager
import lib.wemos as wemos
import lib.weather_api as weather_api

def fetch_weather_data(database_connection):
    for i in range(1, 4):
        try:
            raw_weather_data = wemos.fetch_weather_data()
            if raw_weather_data:

                records = wemos.process_weather_data(raw_weather_data)

                database_connection.save_records(records)

                print(f"Current weather data: {records['values']['temp']} °C")
                return True
            else:
                print(f"No Data from WeMosD1. Attempt {i}/3...")
        except Exception:
            if i < 3:
                time.sleep(2)
                continue
    return False

def fetch_api_weather_data(database_connection):
    raw_outdoor_weather_data = weather_api.req_outdoor_data()
    if raw_outdoor_weather_data:
        records = weather_api.proccess_outdoor_weather_data(raw_outdoor_weather_data)

        database_connection.save_records_api(records)

        print(f"Current weather data from API: {records['values']['temp']} °C")
    else:
        print("No Data from API. Only get 1 per Hour")


if __name__ == "__main__":
    print("Starting System MySQL...")

    db = DatabaseManager()

    api_counter = 0

    while True:
        print("\n--- new cylce ---")
        
        fetch_weather_data(db)

        if api_counter == 0:
            fetch_api_weather_data(db)

        api_counter = (api_counter + 1) % 6

        time.sleep(Config.INTERVAL * 60)
