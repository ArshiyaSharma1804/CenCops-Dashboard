#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Start the Flask Backend
echo -e "${CYAN}Starting Flask Backend...${NC}"
(
  cd backend
  if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Please run setup.sh first!"
    exit 1
  fi
  source venv/bin/activate
  python3 app.py
) &
BACKEND_PID=$!

# Start the Vite Frontend
echo -e "${CYAN}Starting React Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}Servers are running! Press CTRL+C to stop both.${NC}"

# Wait for both processes
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" SIGINT SIGTERM
wait
