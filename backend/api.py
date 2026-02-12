from flask import Flask, jsonify
from flask_cors import CORS
from lib.database import DatabaseManager
from config.config import Config

app = Flask(__name__)
CORS(app)
db = DatabaseManager()

def checkData(data):
    if not data:
        return None
    if isinstance(data, dict) and "error" in data:
        return None
    return data

def changeToJson(data):
    return jsonify(data)

@app.route('/api/weather/current', methods=['GET'])
def current_weather():
    data = db.get_latest_full_status()
    checkValue = checkData(data)
    if checkValue:
       return changeToJson(checkValue) 
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/history_24', methods=['GET'])
def weather_24_history():
    data = db.get_history(hours=24)
    checkValue = checkData(data)
    if checkValue:
       return changeToJson(checkValue) 
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/history_1_month', methods=['GET'])
def weather_1_month_history():
    data = db.get_history(hours=720)
    checkValue = checkData(data)
    if checkValue:
        return changeToJson(checkValue)
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/history_1_week', methods=['GET'])
def weather_1_week_history():
    data = db.get_history(hours=168)
    checkValue = checkData(data)
    if checkValue:
        return changeToJson(checkValue)
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/daily', methods=['GET'])
def daily_max_min():
    data = db.get_daily_max_min()
    checkValue = checkData(data)
    if checkValue:
        return changeToJson(checkValue)
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/rain', methods=['GET'])
def rain():
    data = db.get_rain()
    checkValue = checkData(data)
    if checkValue:
        return changeToJson(checkValue)
    return jsonify({"error": "No data found"}), 404

@app.route('/api/weather/forecast')
def forecast():
    data = db.get_forecast()
    checkValue = checkData(data)
    if checkValue:
        return changeToJson(checkValue)
    return jsonify({"error": "No data found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)