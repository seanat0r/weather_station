#!/usr/bin/env bash
echo "--- weather.log ---"
tail -n 27 ./logs/weather.log
echo "--- weather_error.log ---"
tail -n 27 ./logs/weather_error.log