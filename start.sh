#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "============================================="
echo " Starting ProCV Builder (FastAPI + React) "
echo "============================================="

# Function to kill child processes on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null || true
}
trap cleanup EXIT

# 1. Start FastAPI Backend in background
echo "[1/2] Starting Python FastAPI backend on http://localhost:8000..."
cd "$DIR/backend"
./venv/bin/python run.py &
BACKEND_PID=$!

# Wait a second for backend to bind port
sleep 1.5

# 2. Start Vite Frontend
echo "[2/2] Starting React Vite frontend on http://localhost:5173..."
cd "$DIR/frontend"
npm run dev

wait
