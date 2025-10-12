#!/bin/bash

# Initial VPS Setup Script for Portfolio Deployment
# This script performs the one-time setup on a fresh GoDaddy VPS
#
# Run this ONCE on your VPS as root or with sudo privileges:
#   sudo bash initial-setup.sh

set -e  # Exit on error

# Configuration
DOMAIN="matt-hulme.com"
DEPLOY_PATH="/var/www/${DOMAIN}"
DEPLOY_USER="www-data"
REPO_URL="YOUR_GIT_REPO_URL"  # Update this with your git repository URL

echo "🔧 Starting initial VPS setup for ${DOMAIN}..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi

# 1. Update system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# 2. Install required packages
print_status "Installing required packages..."
apt install -y \
    nginx \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl \
    certbot \
    python3-certbot-nginx \
    nodejs \
    npm

# 3. Update Node.js to LTS version (if needed)
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "Node.js version is old. Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# 4. Create deployment directory
print_status "Creating deployment directory..."
mkdir -p "${DEPLOY_PATH}"
cd "${DEPLOY_PATH}"

# 5. Clone repository
if [ -d ".git" ]; then
    print_warning "Repository already exists, pulling latest..."
    git pull origin main
else
    print_status "Cloning repository..."
    print_warning "Please update REPO_URL in this script before running!"
    # Uncomment and update the line below with your repo URL
    # git clone "${REPO_URL}" .
    echo "Manual step: Clone your repository to ${DEPLOY_PATH}"
fi

# 6. Set up frontend
if [ -d "frontend" ]; then
    print_status "Setting up frontend..."
    cd "${DEPLOY_PATH}/frontend"

    # Install dependencies and build
    npm ci --production=false
    npm run build

    # Create production .env file
    if [ ! -f ".env" ]; then
        print_status "Creating production .env file..."
        cat > .env << 'EOF'
# Production API Configuration
VITE_API_URL=/api
EOF
    fi
fi

# 7. Set up backend
if [ -d "backend" ]; then
    print_status "Setting up backend..."
    cd "${DEPLOY_PATH}/backend"

    # Create virtual environment
    python3 -m venv .venv
    source .venv/bin/activate

    # Install dependencies
    pip install --upgrade pip
    pip install -r requirements.txt

    # Initialize database if needed (add your DB setup commands here)
    print_warning "Remember to initialize your database if needed"
fi

# 8. Set up systemd service
print_status "Setting up systemd service..."
cp "${DEPLOY_PATH}/deployment/portfolio-backend.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable portfolio-backend
systemctl start portfolio-backend

# Check service status
if systemctl is-active --quiet portfolio-backend; then
    print_status "Backend service is running"
else
    print_warning "Backend service failed to start. Check logs with: journalctl -u portfolio-backend -n 50"
fi

# 9. Set up Nginx
print_status "Setting up Nginx..."
cp "${DEPLOY_PATH}/deployment/nginx.conf" /etc/nginx/sites-available/${DOMAIN}
ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# 10. Set up SSL with Let's Encrypt
print_status "Setting up SSL certificate..."
print_warning "About to run certbot. Make sure your domain DNS points to this server!"
read -p "Press Enter to continue or Ctrl+C to cancel..."

certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email YOUR_EMAIL@example.com || print_warning "Certbot failed. Run manually: sudo certbot --nginx -d ${DOMAIN}"

# 11. Set proper permissions
print_status "Setting file permissions..."
chown -R ${DEPLOY_USER}:${DEPLOY_USER} "${DEPLOY_PATH}"
chmod -R 755 "${DEPLOY_PATH}"

# Ensure log files exist and are writable
touch /var/log/portfolio-backend.log
touch /var/log/portfolio-backend-error.log
chown ${DEPLOY_USER}:${DEPLOY_USER} /var/log/portfolio-backend*.log

# 12. Configure firewall (if UFW is installed)
if command -v ufw &> /dev/null; then
    print_status "Configuring firewall..."
    ufw allow 'Nginx Full'
    ufw allow OpenSSH
    # Don't enable automatically to avoid locking out
    print_warning "Firewall rules set but not enabled. Enable with: sudo ufw enable"
fi

# 13. Reload and restart services
print_status "Reloading services..."
systemctl reload nginx
systemctl restart portfolio-backend

# 14. Verify deployment
print_status "Verifying deployment..."
sleep 3

if curl -f http://localhost:8000/api/health > /dev/null 2>&1; then
    print_status "Backend health check passed!"
else
    print_warning "Backend health check failed. Check service status."
fi

if curl -f http://localhost > /dev/null 2>&1; then
    print_status "Nginx is serving content!"
else
    print_warning "Nginx check failed."
fi

echo ""
echo "=========================================="
print_status "Initial setup complete! 🎉"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Verify your DNS points to this server"
echo "2. Run certbot manually if SSL setup failed: sudo certbot --nginx -d ${DOMAIN}"
echo "3. Update your git repository URL in deploy.sh"
echo "4. Test your site at https://${DOMAIN}"
echo ""
echo "Useful commands:"
echo "  - Check backend: sudo systemctl status portfolio-backend"
echo "  - View logs: sudo journalctl -u portfolio-backend -f"
echo "  - Reload Nginx: sudo systemctl reload nginx"
echo "  - Deploy updates: cd ${DEPLOY_PATH}/deployment && ./deploy.sh"
