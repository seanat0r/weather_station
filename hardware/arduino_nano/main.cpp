#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <RCSwitch.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define FUNK_PIN 2

Adafruit_BMP280 bmp;
DHT dht(DHTPIN, DHTTYPE);
RCSwitch mySwitch = RCSwitch();

void setup() {
    Serial.begin(115200);
    delay(100);

    Wire.begin();
    if (!bmp.begin(0x76))
    {
        Serial.println("Could not find BMP280 sensor!");
    }

    dht.begin();

    mySwitch.enableTransmit(10); // Pin D10
}

void loop() {

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    float pressure = bmp.readPressure() / 100.0F;

    if (isnan(temperature)) temperature = 0.0;
    if (isnan(humidity)) humidity = 0.0;

    unsigned long tempPart = (unsigned long)(temperature * 10);
    unsigned long humPart = (unsigned long)humidity;
    unsigned long pressPart = (unsigned long)(pressure -900);

    unsigned long checksum = (tempPart + humPart + pressPart) % 100;

    unsigned long package = (tempPart * 1000000UL) + (humPart * 10000UL) + (pressPart * 100UL) + checksum;

    Serial.println("Send package: "); Serial.println(package);
    Serial.println("T: "); Serial.println(tempPart);
    Serial.println("H: "); Serial.println(humPart);
    Serial.println("P: "); Serial.println(pressPart);
    Serial.println("C: "); Serial.println(checksum);

    mySwitch.send(package, 32);
    delay(5000);
}