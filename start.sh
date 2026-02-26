#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

export PATH="$(ls -d /home/admin-server/.nvm/versions/node/*/bin | tail -n 1):$PATH"

cleanup() {
    kill $MAIN_PID $API_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Python
source "$SCRIPT_DIR/backend/.venv/bin/activate"

python3 "$SCRIPT_DIR/backend/main.py" > "$SCRIPT_DIR/main.log" 2>&1 &
MAIN_PID=$!
echo "SUCCESS main.py started: PID $MAIN_PID"

python3 "$SCRIPT_DIR/backend/api.py" > "$SCRIPT_DIR/api.log" 2>&1 &
API_PID=$!
echo "SUCCESS api.py started: PID $API_PID"


# REACT/ VITE
cd "$SCRIPT_DIR/frontend/"

if ! command -v serve &> /dev/null; then
    echo "ERROR: 'serve' not found in PATH. Check NVM directory!"
    exit 1
fi

if [[ ! -d "dist" ]]; then
    echo "No build found. Building..."
    npm run build
fi

serve -s dist -l 3000 > "$SCRIPT_DIR/frontend_server.log" 2>&1 &
FRONTEND_PID=$!

wait