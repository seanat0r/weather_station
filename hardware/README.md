# Weather Station Project

This directory contains the firmware for the sensor network. The system uses a 433MHz RF link to transmit data from a remote sensor node to a WiFi-connected gateway. This is part 3/3.

## Table of Contents

1. [Architecture](#1-architecture)
2. [Data Packaging & RF Protocol](#2-data-packaging)
3. [Gateway Logic & Calibration](#3-gateway-logic)
4. [Weighted Averaging](#4-weighted-averaging)
5. [Setup & Configuration](#5-setup)

---

## 1. Architecture {#1-architecture}

The hardware setup consists of two distinct units:

* **Remote Sensor Node (Arduino Nano)**: Equipped with a **DHT11** (Temp/Humidity) and a **BMP280** (Pressure). It transmits data every 5 seconds via an RF transmitter.
* **WiFi Gateway (WeMos D1 Mini)**: Equipped with its own **BMP280** and an **AM2320**. It receives remote data, reads local sensors, calculates averages, and hosts a JSON API.

---

## 2. Data Packaging & RF Protocol {#2-data-packaging}

To ensure reliable transmission over the `RCSwitch` library, a custom 32-bit data package is constructed.

### The Package Structure

The sensor values are compressed into a single `unsigned long` to minimize airtime and interference:

| Data Type | Conversion | Shift Value |
| :--- | :--- | :--- |
| **Temperature** | `(temp * 10)` | `* 1,000,000` |
| **Humidity** | `(int) hum` | `* 10,000` |
| **Pressure** | `(pressure - 900)` | `* 100` |
| **Checksum** | `(T+H+P) % 100` | `+ Checksum` |

**Verification:** The Gateway recalculates the checksum upon arrival. If the calculated value doesn't match the received checksum, the packet is discarded to prevent database corruption from noise.

---

## 3. Gateway Logic & Calibration {#3-gateway-logic}

The WeMos D1 Mini manages several tasks concurrently:

* **RF Reception**: Listens for incoming sensor node packets using interrupts.
* **Local Sensing**: Reads a BMP280 and AM2320 via I2C.
* **Temperature Calibration**: Applies a hardcoded `OFFSET` (currently -1) to the local BMP280 to compensate for ESP8266 heat dissipation.
* **WiFi Management**: Uses `WiFiManager` for easy setup without hardcoding credentials and provides an **mDNS** address (`http://WeMosD1_weatherstation.local`).

---

## 4. Weighted Averaging {#4-weighted-averaging}

To provide the most accurate "home" environment data, the Gateway combines the remote and local measurements:

* **Temperature**: The remote Nano sensor is weighted double because it is usually placed further away from heat sources.

    * `Average = ((NanoTemp * 2) + WemosTemp) / 3`

* **Humidity & Pressure**: These values are calculated using a simple arithmetic mean.
    * `Average = (NanoValue + WemosValue) / 2`

If the Nano node is offline, the system automatically falls back to using 100% of the local WeMos data.

---

## 5. Setup & Configuration {#5-setup}

### Required Libraries

* `Adafruit_BMP280` & `Adafruit_AM2320`
* `DHT sensor library`
* `RCSwitch`
* `WiFiManager`

### Flashing

1. **Arduino Nano**: Flash the node sketch. Ensure the RF transmitter is connected to Pin 10.
2. **WeMos D1 Mini**: Flash the gateway sketch. Connect the RF receiver to Pin D5 (GPIO14).

### API Access

Once connected, the data can be retrieved via:

* **Endpoint**: `http://<IP_ADDRESS>/data.json`
* **Format**: `{"temperature": 22.5, "pressure": 1013.2, "humidity": 45.0}`