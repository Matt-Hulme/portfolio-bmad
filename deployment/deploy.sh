#!/bin/bash

# Portfolio Deployment Script for GoDaddy VPS
# This script deploys the portfolio application to matt-hulme.com
#
# Usage: ./deploy.sh

set -e  # Exit on error

# Configuration
DOMAIN="matt-hulme.com"
DEPLOY_USER="www-data"
DEPLOY_PATH="/var/www/${DOMAIN}"
BACKEND_PATH="${DEPLOY_PATH}/backend"
FRONTEND_PATH="${DEPLOY_PATH}/frontend"
REPO_URL="https://github.com/Matt-Hulme/portfolio-bmad.git"

echo "🚀 Starting deployment to ${DOMAIN}..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if running on the server or locally
if [ -d "${DEPLOY_PATH}" ]; then
    # Running on server
    ON_SERVER=true
    print_status "Detected server environment"
else
    # Running locally
    ON_SERVER=false
    print_warning "This script is designed to run on the VPS server"
    echo "Please SSH into your GoDaddy VPS and run this script there"
    exit 1
fi

# 1. Pull latest code
print_status "Pulling latest code from repository..."
cd "${DEPLOY_PATH}"
git pull origin main

# 2. Build frontend
print_status "Building frontend..."
cd "${FRONTEND_PATH}"
npm ci --production=false
npm run build

# 3. Set up backend environment
print_status "Setting up backend..."
cd "${BACKEND_PATH}"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment and install dependencies
print_status "Installing backend dependencies..."
source .venv/bin/activate
pip install -r requirements.txt

# 4. Set proper permissions
print_status "Setting file permissions..."
sudo chown -R ${DEPLOY_USER}:${DEPLOY_USER} "${DEPLOY_PATH}"
sudo chmod -R 755 "${DEPLOY_PATH}"

# Ensure database directory is writable
sudo chown ${DEPLOY_USER}:${DEPLOY_USER} "${BACKEND_PATH}/portfolio.db" || true

# 5. Restart backend service
print_status "Restarting backend service..."
sudo systemctl restart portfolio-backend
sleep 2

# 6. Check backend health
print_status "Checking backend health..."
if curl -f http://localhost:8000/api/health > /dev/null 2>&1; then
    print_status "Backend is healthy!"
else
    print_error "Backend health check failed!"
    sudo systemctl status portfolio-backend
    exit 1
fi

# 7. Reload Nginx
print_status "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

# 8. Verify deployment
print_status "Verifying deployment..."
if curl -f "https://${DOMAIN}/api/health" > /dev/null 2>&1; then
    print_status "Deployment successful! 🎉"
    echo ""
    echo "Your portfolio is now live at: https://${DOMAIN}"
else
    print_warning "External health check failed. Check Nginx configuration and SSL."
fi

# Show recent logs
print_status "Recent backend logs:"
sudo tail -n 20 /var/log/portfolio-backend.log

echo ""
print_status "Deployment complete!"
