#!/bin/bash
set -e

echo "🚀 Starting VPS deployment update..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Pull latest code from GitHub
echo -e "${BLUE}📦 Step 1: Pulling latest code from GitHub...${NC}"
cd /var/www/matt-hulme.com
git fetch origin
git reset --hard origin/main
echo -e "${GREEN}✅ Code updated${NC}"
echo ""

# Step 2: Re-seed database
echo -e "${BLUE}🗄️  Step 2: Re-seeding database with latest project data...${NC}"
cd /var/www/matt-hulme.com/backend
source .venv/bin/activate
python scripts/seed_db.py
echo -e "${GREEN}✅ Database re-seeded with cleaned descriptions${NC}"
echo ""

# Step 3: Rebuild frontend
echo -e "${BLUE}🎨 Step 3: Rebuilding frontend...${NC}"
cd /var/www/matt-hulme.com/frontend
npm ci --ignore-scripts
npm run build
echo -e "${GREEN}✅ Frontend rebuilt${NC}"
echo ""

# Step 4: Restart backend
echo -e "${BLUE}🔄 Step 4: Restarting backend service...${NC}"
sudo systemctl restart portfolio-backend
echo -e "${GREEN}✅ Backend restarted${NC}"
echo ""

# Step 5: Restart Nginx
echo -e "${BLUE}🌐 Step 5: Reloading Nginx...${NC}"
sudo systemctl reload nginx
echo -e "${GREEN}✅ Nginx reloaded${NC}"
echo ""

# Step 6: Verify services
echo -e "${BLUE}🔍 Step 6: Verifying services...${NC}"
if systemctl is-active --quiet portfolio-backend; then
    echo -e "${GREEN}  ✓ Backend service is running${NC}"
else
    echo -e "${YELLOW}  ⚠ Backend service is not running!${NC}"
    sudo systemctl status portfolio-backend
fi

if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}  ✓ Nginx is running${NC}"
else
    echo -e "${YELLOW}  ⚠ Nginx is not running!${NC}"
    sudo systemctl status nginx
fi
echo ""

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "🔧 Updates applied:"
echo "  ✓ Cleaned project descriptions (removed Overview headers)"
echo "  ✓ Card summaries now match modal descriptions"
echo "  ✓ Fixed content accuracy (removed incorrect 'designed' claim)"
echo "  ✓ Replaced em dashes with regular hyphens"
echo "  ✓ Database re-seeded with corrected data"
echo ""
echo "🌐 Visit: https://matt-hulme.com"
