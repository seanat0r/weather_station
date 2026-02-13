import mysql.connector
from flask import jsonify
from config.config import Config

class DatabaseManager:
    def __init__(self):
        self.create_table()

    def get_connection(self):
        """" Connect to MySQL database """
        return mysql.connector.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_DATABASE,
        )
    def create_table(self):
        """" Create table """
        try:
            connection = self.get_connection()
            cursor = connection.cursor()

            sql = """
                  CREATE TABLE IF NOT EXISTS weather_data (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      timestamp VARCHAR(50),
                      home_temperature FLOAT,
                      home_humidity FLOAT,
                      home_pressure FLOAT
                      )
                  """
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS outdoor_weather_data (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    timestamp DATETIME,
                    temp FLOAT,
                    humidity FLOAT,
                    pressure FLOAT,
                    rain FLOAT,
                    wind_speed FLOAT
                )
            """)

            cursor.execute(sql)
            connection.close()
            print("-> [DB INIT] Table checkd/created")
        except mysql.connector.Error as err:
            print(f"-> [DB INIT] Table creation failed: {err}")

    def save_records(self, record):
        """" Save record to database """
        try:
            connection = self.get_connection()
            cursor = connection.cursor()

            vals = record["values"]
            timestamp = record["timestamp"]

            sql = "INSERT INTO weather_data (timestamp, home_temperature, home_humidity, home_pressure) VALUES (%s, %s, %s, %s)"

            data_tuple = (timestamp, vals["temp"], vals["humidity"], vals["pressure"])

            cursor.execute(sql, data_tuple)
            connection.commit()

            cursor.close()
            connection.close()
            print("-> [DB INSERT] Record saved")
        except mysql.connector.Error as err:
            print(f"-> [DB INSERT] Record saving failed: {err}")

    def save_records_api(self, record):
        """" Save api-records to database """
        try:
            connection = self.get_connection()
            cursor = connection.cursor()

            vals = record["values"]
            timestamp = record["timestamp"]

            sql = "INSERT INTO outdoor_weather_data (timestamp, temp, humidity, pressure, rain, wind_speed) VALUES (%s, %s, %s, %s, %s, %s)"

            data_tuple = (timestamp, vals["temp"], vals["humidity"], vals["pressure"], vals["rain"], vals["wind_speed"])

            cursor.execute(sql, data_tuple)
            connection.commit()
            print("-> [DB INSERT] Record saved")
        except mysql.connector.Error as err:
            print(f"-> [DB INSERT] Record saving failed: {err}")

# -----------------------------------
# -------- SELECT STATEMENTS --------
# -----------------------------------

    def get_latest_full_status(self):
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            query = "SELECT * FROM v_weather_master WHERE outdoor_temp IS NOT NULL LIMIT 1"

            cursor.execute(query)
            result = cursor.fetchone()

            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"-> [DB SELECT] Fetch failed: {err}")
            return None
    
    def get_history(self, hours):
        maxHour = 744
        if hours >  maxHour:
            return jsonify({"error:" "Request too large. Max 744 hours allowed"})
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            query = "SELECT * FROM v_weather_master WHERE timestamp >= NOW() - INTERVAL %s HOUR ORDER BY timestamp ASC"

            cursor.execute(query, (hours,))
            result = cursor.fetchall()
        
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"-> [DB SELECT] History fetch failed: {err}")
            return None
        
    def get_daily_max_min(self):
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
            SELECT 
                MAX(indoor_temp) AS max_temp_in, 
                MIN(indoor_temp) AS min_temp_in,
                MAX(outdoor_temp) AS max_temp_out, 
                MIN(outdoor_temp) AS min_temp_out,
                MAX(wind_speed) AS max_wind,
                ROUND(SUM(rain), 2) AS total_rain
            FROM v_weather_master 
            WHERE timestamp >= NOW() - INTERVAL 24 HOUR
                    """
            cursor.execute(query)
            result = cursor.fetchone()

            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"-> [DB SELECT] Stats fetch failed: {err}")
            return None
        
    def get_rain(self):
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            query = "SELECT SUM(hour_rain) AS total_rain FROM ( SELECT ROUND(AVG(rain), 1) AS hour_rain FROM v_weather_master WHERE timestamp >= NOW() - INTERVAL 24 HOUR GROUP BY HOUR(timestamp), DAY(timestamp) ) AS daily_query"

            cursor.execute(query)
            result = cursor.fetchone()

            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"-> [DB SELECT] Stats fetch failed: {err}")
            return None
        
    def get_forecast(self):
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
            (SELECT outdoor_press FROM v_weather_master WHERE outdoor_temp IS NOT NULL ORDER BY timestamp DESC LIMIT 1)
            UNION ALL
            (SELECT outdoor_press FROM v_weather_master WHERE outdoor_temp IS NOT NULL AND timestamp <= NOW() - INTERVAL 3 HOUR ORDER BY timestamp DESC LIMIT 1)
        """

            cursor.execute(query)
            result = cursor.fetchall()

            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"-> [DB SELECT] Stats fetch failed: {err}")
            return None
