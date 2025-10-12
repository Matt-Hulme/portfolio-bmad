#!/bin/bash

# Quick Deploy Script
# For deploying from your local machine to the VPS
#
# Usage: ./quick-deploy.sh [branch]
# Example: ./quick-deploy.sh main

set -e

BRANCH=${1:-main}
SERVER="matt-hulme.com"
SERVER_USER="YOUR_SSH_USER"  # Update this!
DEPLOY_PATH="/var/www/matt-hulme.com"

echo "🚀 Quick deploying branch '${BRANCH}' to ${SERVER}..."

# SSH into server and run deployment
ssh ${SERVER_USER}@${SERVER} << ENDSSH
    set -e
    cd ${DEPLOY_PATH}

    echo "📥 Pulling latest code from ${BRANCH}..."
    git fetch origin
    git checkout ${BRANCH}
    git pull origin ${BRANCH}

    echo "🏗️  Building frontend..."
    cd frontend
    npm ci
    npm run build

    echo "🐍 Updating backend..."
    cd ../backend
    source .venv/bin/activate
    pip install -r requirements.txt

    echo "♻️  Restarting services..."
    sudo systemctl restart portfolio-backend
    sleep 2
    sudo systemctl reload nginx

    echo "✅ Checking health..."
    curl -f http://localhost:8000/api/health

    echo "🎉 Deployment complete!"
ENDSSH

echo ""
echo "✅ Remote deployment finished successfully!"
echo "🌐 Check your site at: https://${SERVER}"
