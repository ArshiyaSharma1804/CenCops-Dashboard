#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${CYAN}Setting up Node modules...${NC}"
npm install

echo -e "${CYAN}Setting up Python virtual environment...${NC}"
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo -e "${GREEN}Setup complete! You can now run ./start.sh${NC}"
