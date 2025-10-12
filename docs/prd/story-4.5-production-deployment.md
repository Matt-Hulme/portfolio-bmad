# Story 4.5: Production Deployment to GoDaddy VPS

**Epic:** Epic 4 - Production Deployment & Quality Assurance
**Status:** Not Started
**Branch:** `story/4.5-production-deployment`

**⚠️ IMPORTANT:** This story is intentionally LAST in Epic 4. Complete Stories 4.2 (E2E Core), 4.3 (E2E Filtering), and optionally 4.4 (Accessibility) before deploying to production.

## User Story

**As a** developer,
**I want** the portfolio deployed to the GoDaddy VPS at matt-hulme.com,
**so that** the site is publicly accessible with proper routing, performance, and security.

## Context

This story executes the actual deployment to production using the infrastructure created in Story 4.1. At the end of this story, the portfolio will be live at `https://matt-hulme.com`.

## Prerequisites

### Before Starting
- [ ] Story 4.1 complete (deployment infrastructure ready)
- [ ] Epic 3 code merged to main branch
- [ ] GoDaddy VPS access credentials available
- [ ] SSH access to VPS verified
- [ ] VPS IP address known
- [ ] DNS A record configured to point matt-hulme.com to VPS IP
- [ ] DNS propagation verified (`nslookup matt-hulme.com`)

### Configuration Updates Needed
- [ ] Update `REPO_URL` in `deployment/initial-setup.sh`
- [ ] Update `REPO_URL` in `deployment/deploy.sh`
- [ ] Update `SERVER_USER` in `deployment/quick-deploy.sh`
- [ ] Update email for certbot in `deployment/initial-setup.sh`
- [ ] Review CORS settings in `backend/app/main.py`

## Acceptance Criteria

### System Setup
- [ ] SSH into GoDaddy VPS successful
- [ ] System packages updated
- [ ] Node.js 18+ installed
- [ ] Python 3 installed
- [ ] Nginx installed
- [ ] Git installed
- [ ] Certbot installed

### Application Deployment
- [ ] Repository cloned to `/var/www/matt-hulme.com`
- [ ] Directory structure correct
- [ ] Frontend dependencies installed
- [ ] Frontend built successfully in production
- [ ] Backend virtual environment created at `backend/.venv`
- [ ] Backend dependencies installed
- [ ] Database file exists at `backend/portfolio.db`
- [ ] Database has correct permissions (www-data:www-data)

### Service Configuration
- [ ] systemd service file copied to `/etc/systemd/system/portfolio-backend.service`
- [ ] Service daemon reloaded
- [ ] Service enabled (`sudo systemctl enable portfolio-backend`)
- [ ] Service started (`sudo systemctl start portfolio-backend`)
- [ ] Service status is "active (running)"
- [ ] Service auto-starts on boot

### Nginx Configuration
- [ ] Nginx config copied to `/etc/nginx/sites-available/matt-hulme.com`
- [ ] Symlink created in `/etc/nginx/sites-enabled/`
- [ ] Default site disabled
- [ ] Nginx configuration test passes (`sudo nginx -t`)
- [ ] Nginx reloaded/restarted

### SSL/HTTPS Setup
- [ ] Certbot run successfully
- [ ] Certificate obtained for `matt-hulme.com`
- [ ] Certificate obtained for `www.matt-hulme.com`
- [ ] HTTP redirects to HTTPS
- [ ] HTTPS loads without browser warnings
- [ ] Certificate auto-renewal configured (cron job exists)

### Permissions & Security
- [ ] All application files owned by `www-data:www-data`
- [ ] Directory permissions set to 755
- [ ] File permissions appropriate
- [ ] Log files writable by www-data
- [ ] Security headers configured in Nginx
- [ ] CORS restricted to production domain

### Verification & Testing
- [ ] Backend health check responds: `curl http://localhost:8000/api/health`
- [ ] Public API responds: `curl https://matt-hulme.com/api/health`
- [ ] Projects API returns data: `curl https://matt-hulme.com/api/projects`
- [ ] Homepage loads at `https://matt-hulme.com`
- [ ] All 7 project cards visible
- [ ] Project modal opens correctly
- [ ] Navigation works (Home, Projects, Resume)
- [ ] Resume page loads
- [ ] Resume PDF downloads
- [ ] Client-side routing works (refresh on `/resume` serves index.html)
- [ ] Media files load (images/videos from backend)
- [ ] No console errors in browser DevTools
- [ ] No 404s for static assets
- [ ] Gzip compression verified (check response headers)
- [ ] Cache headers present on static assets
- [ ] Mobile view works correctly

## Technical Implementation

### Step 1: Prepare Local Repository
```bash
# Ensure on main branch with latest Epic 3 code
git checkout main
git pull origin main

# Update deployment scripts with your details
# Edit: deployment/initial-setup.sh, deploy.sh, quick-deploy.sh
```

### Step 2: SSH into VPS
```bash
ssh your-username@matt-hulme.com
# or
ssh your-username@YOUR_VPS_IP
```

### Step 3: Run Initial Setup
```bash
# As root or with sudo
sudo -i
cd /tmp
git clone YOUR_REPO_URL portfolio-setup
cd portfolio-setup/deployment
bash initial-setup.sh
```

### Step 4: Verify Deployment
```bash
# Check backend service
sudo systemctl status portfolio-backend

# Check Nginx
sudo systemctl status nginx

# Test health endpoint
curl http://localhost:8000/api/health

# Test public endpoint
curl https://matt-hulme.com/api/health

# View logs
sudo journalctl -u portfolio-backend -n 50
sudo tail -50 /var/log/nginx/portfolio-access.log
```

### Step 5: Production Configuration
Update backend CORS (if not already done):
```python
# backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://matt-hulme.com",
        "https://www.matt-hulme.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)
```

Then redeploy:
```bash
cd /var/www/matt-hulme.com/deployment
./deploy.sh
```

## Testing Checklist

### Functional Testing
- [ ] All pages accessible
- [ ] All API endpoints return correct data
- [ ] Project filtering works
- [ ] Project modals work
- [ ] Navigation works
- [ ] Resume download works

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Static assets cached
- [ ] Gzip compression working

### Security Testing
- [ ] HTTPS enforced
- [ ] No mixed content warnings
- [ ] Security headers present
- [ ] CORS properly restricted

### Cross-browser Testing
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Mobile browsers work

## Troubleshooting Guide

### Backend Service Won't Start
```bash
# Check logs
sudo journalctl -u portfolio-backend -n 100

# Check if port 8000 is in use
sudo lsof -i :8000

# Test manually
cd /var/www/matt-hulme.com/backend
source .venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### 502 Bad Gateway
- Backend service not running
- Fix: `sudo systemctl restart portfolio-backend`

### SSL Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Re-run certbot
sudo certbot --nginx -d matt-hulme.com -d www.matt-hulme.com
```

### Frontend Not Updating
```bash
# Rebuild
cd /var/www/matt-hulme.com/frontend
npm run build

# Reload Nginx
sudo systemctl reload nginx

# Clear browser cache
```

## Rollback Plan

If deployment fails:
```bash
# Check what went wrong
sudo journalctl -u portfolio-backend -n 100
sudo tail -100 /var/log/nginx/portfolio-error.log

# Rollback to previous commit
cd /var/www/matt-hulme.com
git log --oneline -10
git checkout <previous-working-commit>
./deployment/deploy.sh
```

## Definition of Done

- [ ] Site is live at `https://matt-hulme.com`
- [ ] All features work correctly in production
- [ ] All acceptance criteria met
- [ ] No errors in logs
- [ ] SSL certificate valid
- [ ] Services running and enabled
- [ ] Deployment documented
- [ ] Team/stakeholders notified

## Post-Deployment Tasks

### Immediate
- [ ] Test all functionality thoroughly
- [ ] Monitor logs for errors
- [ ] Verify SSL auto-renewal is scheduled

### Ongoing
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Schedule database backups
- [ ] Document any custom configurations
- [ ] Share production URL with team

## Dependencies

**Requires:**
- Story 4.1: Deployment Infrastructure Setup (Complete)

**Enables:**
- Story 4.3: E2E Test Suite - Core Flows
- Story 4.4: E2E Test Suite - Filtering
- Story 4.5: Accessibility Audit
- Story 4.6: Visual Polish & Performance

## Notes

- Initial deployment takes ~15-30 minutes
- SSL certificate generation requires DNS to be configured
- Let's Encrypt has rate limits (5 certificates per week per domain)
- Keep initial-setup.sh for reference but only run once
- Use deploy.sh for all subsequent deployments
- Monitor disk space on VPS (SQLite database will grow)

## Success Metrics

- ✅ Site accessible at https://matt-hulme.com
- ✅ 100% uptime after deployment
- ✅ < 3 second page load time
- ✅ All features functional
- ✅ No production errors in logs
