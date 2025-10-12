# Story 4.1: Deployment Infrastructure Setup

**Epic:** Epic 4 - Production Deployment & Quality Assurance
**Status:** Partially Complete
**Branch:** `story/4.1-deployment-infrastructure`

## User Story

**As a** developer,
**I want** deployment infrastructure and scripts ready for VPS deployment,
**so that** I can reliably deploy and update the portfolio on the production server.

## Context

This story establishes all the necessary infrastructure, configuration files, and documentation needed to deploy the portfolio to a GoDaddy VPS. It prepares everything for Story 4.2 (actual deployment).

## Acceptance Criteria

### Infrastructure Files
- [x] Nginx configuration file created (`deployment/nginx.conf`)
  - Reverse proxy setup for `/api/*` routes
  - Static file serving for frontend
  - SSL/TLS configuration
  - Caching headers for assets
  - Security headers
  - SPA routing support

- [x] systemd service unit created (`deployment/portfolio-backend.service`)
  - Service runs as www-data user
  - Auto-restart on failure
  - Logging configured
  - Auto-start on boot

### Deployment Scripts
- [x] Initial setup script (`deployment/initial-setup.sh`)
  - System package installation
  - Application setup
  - Service configuration
  - SSL certificate setup with certbot
  - Permission management

- [x] Deployment script (`deployment/deploy.sh`)
  - Git pull latest code
  - Build frontend
  - Install dependencies
  - Restart services
  - Health checks
  - Runs on VPS server

- [x] Quick deploy script (`deployment/quick-deploy.sh`)
  - SSH into VPS from local machine
  - Execute deployment remotely
  - User-friendly for rapid updates

### Documentation
- [x] Comprehensive deployment README (`deployment/README.md`)
  - Architecture overview
  - Initial deployment guide
  - Update deployment process
  - Troubleshooting section
  - Database management
  - SSL renewal
  - Useful commands

- [x] Deployment checklist (`deployment/DEPLOYMENT-CHECKLIST.md`)
  - Pre-deployment steps
  - Initial deployment checklist
  - Verification steps
  - Post-deployment tasks
  - Rollback plan
  - Common issues

### Configuration
- [x] Production environment template (`.env.production.example`)
- [x] All scripts are executable
- [x] Frontend production build verified
  - Bundle size: 103.52 KB gzipped (well under 500KB target)
  - Build completes successfully
  - TypeScript compilation passes

### Pending
- [ ] Update `REPO_URL` in scripts with actual repository URL
- [ ] Test deployment scripts on actual VPS
- [ ] Backend CORS settings updated for production domain
- [ ] Backend logging configuration reviewed
- [ ] Production environment variables finalized

## Technical Details

### File Structure Created
```
deployment/
├── nginx.conf                          # Nginx configuration
├── portfolio-backend.service           # systemd service unit
├── initial-setup.sh                    # First-time VPS setup
├── deploy.sh                          # Ongoing deployment script
├── quick-deploy.sh                    # Remote deployment from local
├── .env.production.example            # Environment variables template
├── README.md                          # Comprehensive guide
└── DEPLOYMENT-CHECKLIST.md            # Step-by-step checklist
```

### Nginx Configuration Highlights
- Listens on ports 80 (HTTP) and 443 (HTTPS)
- HTTP → HTTPS redirect
- Proxies `/api/*` to backend on localhost:8000
- Proxies `/images/*` and `/videos/*` to backend
- Serves static assets from `/var/www/matt-hulme.com/frontend/dist`
- 1-year cache for immutable assets
- Security headers configured
- Gzip compression enabled

### systemd Service Highlights
- Runs backend with uvicorn (2 workers)
- Runs as www-data user (not root)
- Auto-restart on failure
- Logs to `/var/log/portfolio-backend.log`
- Starts on boot

### Deployment Process
1. **Initial Setup:** Run `initial-setup.sh` once on VPS
2. **Updates:** Run `deploy.sh` on VPS or `quick-deploy.sh` from local machine
3. **Verification:** Health check at `/api/health`

## Testing Notes

### Local Testing Completed
- Frontend build tested successfully
- Bundle size verified (103.52 KB gzipped)
- All scripts made executable
- Documentation reviewed for completeness

### VPS Testing Pending
- Actual deployment to GoDaddy VPS (Story 4.2)
- SSL certificate generation
- Service startup and auto-restart
- Nginx configuration validation
- End-to-end deployment workflow

## Dependencies

**Prerequisite Stories:**
- Story 3.2 (Home page and navigation) - Complete
- Epic 3 merged to main branch

**Enables Stories:**
- Story 4.2: Production Deployment to GoDaddy VPS
- Story 4.3-4.6: Testing, accessibility, and polish (on production site)

## Definition of Done

- [x] All configuration files created
- [x] All deployment scripts created and executable
- [x] Comprehensive documentation written
- [x] Deployment checklist created
- [x] Frontend production build verified
- [ ] Scripts tested on actual VPS (Story 4.2)
- [ ] Backend configuration updated for production
- [ ] Repository URL updated in all scripts

## Next Steps

1. **Before Story 4.2:**
   - Update `REPO_URL` in deployment scripts
   - Review backend CORS settings
   - Ensure DNS is configured for matt-hulme.com

2. **Story 4.2 Tasks:**
   - SSH into GoDaddy VPS
   - Run `initial-setup.sh`
   - Verify deployment
   - Test all functionality in production

## Notes

- Frontend bundle size is excellent: 103.52 KB gzipped (79% under target)
- All Epic 3 features are ready for deployment
- Health check endpoint already exists: `/api/health`
- Documentation is thorough and production-ready
- Scripts follow best practices (error handling, status messages)
