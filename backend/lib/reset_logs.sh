#!/usr/bin/env bash

BASE_DIR="/home/admin-server/projects/weather_station/logs"

files=$(find "$BASE_DIR" -type f -mtime +30)

for f in $files; do
    > "$f"
done