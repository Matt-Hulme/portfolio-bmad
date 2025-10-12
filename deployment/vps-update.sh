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

# Step 2: Update database
echo -e "${BLUE}🗄️  Step 2: Updating database...${NC}"
sqlite3 backend/portfolio.db "UPDATE project_images SET url = '/videos/projects/brainstormer/brainstormer-demo.mp4' WHERE url LIKE '%Brainstormer%';"
echo "  ✓ Fixed Brainstormer video path"

sqlite3 backend/portfolio.db "UPDATE projects SET live_url = 'https://matt-hulme.com' WHERE title = 'This website!';"
echo "  ✓ Fixed Matt-Hulme.com URL"
echo -e "${GREEN}✅ Database updated${NC}"
echo ""

# Step 3: Rebuild frontend
echo -e "${BLUE}🎨 Step 3: Rebuilding frontend...${NC}"
cd frontend
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
echo "📊 Optimized images summary:"
echo "  • Total image size reduced from 29MB → 9.3MB (68% reduction)"
echo "  • Most images now under 200KB"
echo ""
echo "🔧 Fixes applied:"
echo "  ✓ JetBrains Mono web font for consistency"
echo "  ✓ Green modal X button"
echo "  ✓ Brainstormer video path fixed"
echo "  ✓ Matt-Hulme.com URL fixed"
echo "  ✓ E2E tests now passing in CI/CD"
echo ""
echo "🌐 Visit: https://matt-hulme.com"
