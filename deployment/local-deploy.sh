#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if VPS_IP is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./local-deploy.sh <VPS_IP>${NC}"
    echo "Example: ./local-deploy.sh 123.456.789.10"
    exit 1
fi

VPS_IP=$1
VPS_USER="root"

echo -e "${BLUE}🚀 Starting deployment to VPS: ${VPS_IP}${NC}"
echo ""

# Step 1: Copy optimized images to VPS
echo -e "${BLUE}📸 Step 1: Copying optimized images (9.3MB) to VPS...${NC}"
scp -r ../backend/static/images/projects ${VPS_USER}@${VPS_IP}:/var/www/matt-hulme.com/backend/static/images/
echo -e "${GREEN}✅ Images copied${NC}"
echo ""

# Step 2: Copy update script to VPS
echo -e "${BLUE}📝 Step 2: Copying update script to VPS...${NC}"
scp vps-update.sh ${VPS_USER}@${VPS_IP}:/var/www/matt-hulme.com/deployment/
echo -e "${GREEN}✅ Script copied${NC}"
echo ""

# Step 3: Run update script on VPS
echo -e "${BLUE}🔧 Step 3: Running update script on VPS...${NC}"
ssh ${VPS_USER}@${VPS_IP} "chmod +x /var/www/matt-hulme.com/deployment/vps-update.sh && /var/www/matt-hulme.com/deployment/vps-update.sh"
echo ""

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Test your site:"
echo "  • https://matt-hulme.com (should load faster with optimized images)"
echo "  • Brainstormer video should now load"
echo "  • Modal X button should be green"
echo "  • Fonts should be consistent across devices"
echo "  • Matt-Hulme.com project URL should work correctly"
