# 🌤️ IoT Weather Station - Full Stack Project

A complete end-to-end IoT solution for monitoring local and indoor weather conditions. This project tracks temperature, humidity, and atmospheric pressure using a custom sensor network and visualizes the data on a responsive web dashboard.

## Project Structure

This repository is divided into three main components:

* **[Part 1: Backend](./backend)**: A Python-based data collector and Flask REST API. It manages the MariaDB database and fetches data from sensors and external APIs.
* **[Part 2: Frontend](./frontend)**: A modern React dashboard built with Vite and TypeScript, featuring data visualization via Recharts.
* **[Part 3: Hardware](./hardware)**: C++ firmware for the Arduino Nano (sensor node) and WeMos D1 Mini (WiFi gateway).

---

## System Architecture

The data flows from the physical sensors to your digital dashboard:

1. **Collection**: An **Arduino Nano** reads indoor sensors and sends data via RF to the **WeMos D1 Mini**.
2. **Gateway**: The **WeMos D1 Mini** acts as a WiFi gateway, serving the data as JSON via a static IP or mDNS.
3. **Processing**: A **Python Service** on a Linux server fetches this JSON every 5 minutes and enriches it with outdoor data from the **Open-Meteo API**.
4. **Storage**: All validated data is stored in a **MariaDB** database.
5. **Access**: A **Flask API** serves the data to a **React Frontend**, which is accessible via **Tailscale** for secure remote monitoring.

```mermaid
graph LR
    H[Hardware/Sensors] --> B[Python Backend]
    B <--> D[(MariaDB)]
    B --> F[React Frontend]
    F --> P[User]
```

## Global Technology Stack

* **Languages:** Python, TypeScript, C++, SQL.

* **Frameworks:** React (Vite), Flask.

* **Infrastructure:** MariaDB, Systemd (Linux Daemons), NVM (Node Version Manager).

* **Networking:** Tailscale VPN, mDNS, REST API (JSON).

## Quick Start

To get the entire system running, follow the setup guides in each sub-directory:

1. **Hardware:** Flash the sketches in /hardware to your microcontrollers.

2. **Backend:** Set up the MariaDB database and start the Python service following the Backend Guide.

3. **Frontend:** Build the dashboard using the instructions in the Frontend Guide.

4. **Automation:** Use the provided start.sh script to run the backend and frontend concurrently as a systemd service.

### Crucial Configuration Before Startup

#### Backend Setup

Navigate to `./backend/` and create a `.env` file with the following content:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db
WEMOS_URL=http://WeMosD1_weatherstation.local/data.json
IP=192.168.1.1
INTERVAL=5
```

* **DB_XX:** Give your DB access in accordingly

* **WEMOS_URL:** The mDNS address of the gateway.
* **IP:** The static IP of your WeMos gateway.

  * **Switching between IP/URL:** By default, the system uses the `WEMOS_IP`. To use the mDNS URL instead, modify the `WEMOS_IP_URL` variable in `./backend/config/config.py`.

* **INTERVAL:** How many minutes the delay is.

* **Outdoor API:** To change your weather location, update the coordinates in the `url` variable within `./backend/lib/weather_api.py`. It currently points to a specific village (Lat: 47.3975, Long: 8.008).

  * **Note on Security:** I opted not to put the Open-Meteo API link in the `.env` as it is a free, open service. However, for private keys or paid services, always use environment variables to keep them hidden from GitHub!

#### Frontend Setup

Navigate to `./frontend/` and create a `.env` file:

```env
VITE_WEATHER_API=http://YOUR_SERVER_IP/api/weather
```

* **VITE_WEATHER_API:** Replace `YOUR_SERVER_IP` with your actual server IP (e.g., your Tailscale IP or local network IP) to ensure the dashboard can reach the Flask API.

#### Hardware Setup

To change the network hostname of your gateway, look for this line in the WeMos C++ code:

```cpp
WiFi.hostname("WeMosD1_weatherstation"); // Change your network name here
```

*It is highly recommended to assign a static IP to your WeMos in your router settings and match it in the Backend .env file!*

## Key Features

* **Data Integrity:** Implements a weighting algorithm on the gateway to ensure sensor accuracy.

* **Reliability:** Automated data collection via Linux-based daemon services.

* **Security:** Sensitive credentials managed via .env and remote access secured through Tailscale.

* **Modern UI:** Fully responsive dashboard with historical trend analysis and custom SVG icons.
