#include <Arduino.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_AM2320.h>
#include <WiFiManager.h>
#include <ESP8266mDNS.h>
#include <RCSwitch.h>

Adafruit_BMP280 bmp;
Adafruit_AM2320 am2320;

ESP8266WebServer server(80);

#define I2C_SDA D2
#define I2C_SCL D1

const float OFFSET = -1;

RCSwitch mySwitch = RCSwitch();

float nanoTemperature = 0.0, nanoHumidity = 0.0, nanoPressure = 0.0;
float wemosTemperature = 0.0, wemosHumidity = 0.0, wemosPressure = 0.0;
float averageTemperature = 0.0, averageHumidity = 0.0, averagePressure = 0.0;

unsigned long lastSensorUpdate = 0;
const unsigned long sensorInterval = 5000;


void funk()
{
    if (mySwitch.available()) {
        unsigned long received = mySwitch.getReceivedValue();

        unsigned long receivedChecksum = received % 100;
        unsigned long data = received / 100;

        unsigned long p_raw = data % 100;
        unsigned long h_raw = (data / 100) % 100;
        unsigned long t_raw  = (data / 10000);

        unsigned long calculatedChecksum = (p_raw + h_raw + t_raw) % 100;

        if (calculatedChecksum == receivedChecksum)
        {
            nanoTemperature = t_raw / 10.0;
            nanoHumidity = (float)h_raw;
            nanoPressure = (float)(p_raw + 900);
            Serial.printf("-- FUNK OK: T: %.2f | H: %.2f | P: %.2f\n", nanoTemperature, nanoHumidity, nanoPressure);
        }
        else
        {
            Serial.println("--- FUNK DATA INVALID ---");
            Serial.printf("Sum Calc: %d | Sum Got: %d | Data: %ld\n", calculatedChecksum, receivedChecksum, data);
        }

        mySwitch.resetAvailable();
    }
}

void wemosData()
{
    bmp.takeForcedMeasurement();

    float temp_check = bmp.readTemperature();
    float press_check = bmp.readPressure() / 100.0F;
    wemosHumidity = am2320.readHumidity();

    if (isnan(wemosHumidity)) {
        delay(50);
        wemosHumidity = am2320.readHumidity();
        if (isnan(wemosHumidity)) wemosHumidity = 0.0;
    }

    if (!isnan(wemosTemperature))
    {
        wemosTemperature = temp_check + OFFSET;
    }

    if (!isnan(wemosPressure))
    {
        wemosPressure = press_check;
    }

    Serial.printf("-- LOCAL DATA: T: %.2f | H: %.2f | P: %.2f\n", wemosTemperature, wemosHumidity, wemosPressure);
}

void calculateData()
{
    if (nanoTemperature == 0)
    {
        averageHumidity = wemosHumidity;
        averageTemperature = wemosTemperature;
        averagePressure = wemosPressure;
    } else
    {
        averageTemperature = (((nanoTemperature * 2.0) + wemosTemperature) / 3);
        averageHumidity = (nanoHumidity + wemosHumidity) / 2;
        averagePressure = (nanoPressure + wemosPressure) / 2;
    }

    Serial.printf("-- AVERAGE DATA: T: %.2f | H: %.2f | P: %.2f\n", averageTemperature, averageHumidity, averagePressure);
}

void handleJSON()
{
    String json = "{";
    json += "\"temperature\": " + String(averageTemperature) + ",";
    json += "\"pressure\": " + String(averagePressure) + ",";
    json += "\"humidity\": " + String(averageHumidity);
    json += "}";

    server.send(200, "application/json", json);
}

void setup() {
    Serial.begin(115200);
    delay(100);

    Wire.begin(I2C_SDA, I2C_SCL);
    bmp.begin(0x76);

    mySwitch.enableReceive(digitalPinToInterrupt(D5));

    bmp.setSampling(Adafruit_BMP280::MODE_FORCED,
                    Adafruit_BMP280::SAMPLING_X2,
                    Adafruit_BMP280::SAMPLING_X16,
                    Adafruit_BMP280::FILTER_X16,
                    Adafruit_BMP280::STANDBY_MS_500);

    am2320.begin();

    WiFi.hostname("WeMosD1_weatherstation");
    WiFiManager wm;

    Serial.println("Connecting to WLAN or create a Hotspot");

    bool res = wm.autoConnect("Weatherstation-Setup");

    if (!res)
    {
        Serial.println("Connecting failed (Timeout)");
        ESP.restart();
    }

    if (MDNS.begin("WeMosD1_weatherstation"))
    {
        Serial.println("MDNS response started");
        Serial.print("IP address: ");
        Serial.println("Hostname: http://WeMosD1_weatherstation.local");
    } else
    {
        Serial.println("Error initializing MDNS response objects");
    }

    server.on("/", handleJSON);
    server.on("/data.json", handleJSON);
    server.begin();
}

void loop() {
    funk();
    MDNS.update();
    server.handleClient();

    if (millis() - lastSensorUpdate >= sensorInterval)
    {
        lastSensorUpdate = millis();
        wemosData();
        calculateData();
    }
}