# Weather Station Project

## Table of Contents

1. Architecture
2. Technology
3. Database Design
4. API Concept
5. Problems & Solutions
6. What I Learned
7. Next Steps

## 1. Architectur

### Structure

#### Microcontrollers

The project uses two microcontrollers to collect indoor weather data (temperature, humidity, and pressure). An Arduino Nano acts as a remote sensor node, sending data wirelessly to a WeMos D1 Mini (the gateway). The WeMos checks signal integrity and applies a weighting algorithm to determine data accuracy before averaging. The final data is served in JSON format via a static IP address or mDNS (`wemosd1_weatherstation.local`).

#### Python Backend (Data Collector)

A Python script (main.py) runs as a Linux daemon on a mini-PC server.

- **Indoor Data**: Fetched every 5 minutes from the WeMos D1 Mini.

- **Outdoor Data**: Fetched every 30 minutes from the Open-Meteo API (fetching local weather for my village).
The backend validates all incoming data before committing it to the database.

#### MariaDB

Data is stored in a MariaDB instance. All sensitive credentials (passwords, API keys) are managed via a `.env` file, which is excluded from version control for security.

### Visualization

Codeflow:

```mermaid
[Sensors]           [Processing & Storage]          [Access]
Arduino (RF) --+       Open-Meteo API       +-- Frontend
               |                    |       |
               |                    |       |
            WeMosD1 (mDNS/IP) -> Python Service --+-- REST API (Flask)
                                     |
                                 MariaDB
```

## 2. Technology

### Hardware

- WeMos D1 Mini: WiFi-enabled gateway.
- Arduino Nano: Remote sensor node.
- Mini-PC: Dedicated Linux server for realistic environment testing.

### Database

- MariaDB: Relational database for time-series data.

### Languages

- Python: used for backend and API creation
- C++: used for Arduino and WeMos D1

### Data Format

- JSON: standard for IoT applications

## 3. Database Design

### Tables

There are two tables: one for self-collected data (WeMos D1 + Arduino Nano) and one for external API data (OpenWeather). There is no direct relationship between the two tables, but timestamps are used to align the data when needed.

**weather_data** (WeMos + Arduino)

- id INT PRIMARY KEY
- timestamp TIMESTAMP
- home_temperature FLOAT
- home_humidity FLOAT
- home_pressure FLOAT

**outdoor_weather_data** (OpenWeather API)

- id INT PRIMARY KEY
- timestamp TIMESTAMP
- temp FLOAT
- humidity FLOAT
- pressure FLOAT
- rain FLOAT
- wind_speed FLOAT

## 4. API Conzept

All API calls are under the path `/api/weather/`. Each endpoint selects different data from the database and returns it in JSON format. If an API call fails or the data is invalid, nothing is returned.

## 5. Problems and Solutions

Initially, I tried to connect to the WeMos using only its hostname. Overnight logs showed many errors. To fix this, I assigned a static IP address, which resolved all data collection issues.

## 6. What I learned

I learned a lot of Python while writing this project. I also improved my skills in checking wireless signal reliability and refreshed my knowledge of database concepts.

## 7. Next Steps

Currently, the backend collects data and provides several API endpoints. The next step is to create a frontend dashboard to visualize this data in a simple and user-friendly interface.
