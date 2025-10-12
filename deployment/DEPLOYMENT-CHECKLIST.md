# Deployment Checklist

Use this checklist when deploying to production.

## Pre-Deployment (Local)

### Code Preparation
- [ ] All Epic 3 features merged to main branch
- [ ] All tests passing (`npm test -- --run` in frontend)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Git is on main branch and up to date

### Configuration Updates
- [ ] Update `REPO_URL` in `deployment/initial-setup.sh`
- [ ] Update `REPO_URL` in `deployment/deploy.sh`
- [ ] Update `SERVER_USER` in `deployment/quick-deploy.sh`
- [ ] Update email in `deployment/initial-setup.sh` for certbot
- [ ] Review and update CORS settings in `backend/app/main.py` for production

### Documentation Review
- [ ] Read through `deployment/README.md`
- [ ] Understand all deployment scripts
- [ ] Have SSH credentials ready
- [ ] Know your VPS IP address

## Initial Deployment (On VPS)

### Server Access
- [ ] SSH access to GoDaddy VPS confirmed
- [ ] Have sudo/root privileges
- [ ] DNS A record points to VPS IP address
- [ ] DNS propagation complete (check with `nslookup matt-hulme.com`)

### System Setup
- [ ] Run `initial-setup.sh` script
- [ ] Verify all packages installed successfully
  - [ ] Nginx installed
  - [ ] Python 3 installed
  - [ ] Node.js 18+ installed
  - [ ] Git installed
  - [ ] Certbot installed

### Application Setup
- [ ] Repository cloned to `/var/www/matt-hulme.com`
- [ ] Frontend dependencies installed
- [ ] Frontend built successfully
- [ ] Backend virtual environment created
- [ ] Backend dependencies installed
- [ ] Database file exists and has correct permissions

### Service Configuration
- [ ] systemd service created at `/etc/systemd/system/portfolio-backend.service`
- [ ] Service enabled (`systemctl is-enabled portfolio-backend`)
- [ ] Service running (`systemctl is-active portfolio-backend`)
- [ ] Service starts on boot (test with `sudo systemctl is-enabled portfolio-backend`)

### Nginx Configuration
- [ ] Nginx config copied to `/etc/nginx/sites-available/matt-hulme.com`
- [ ] Symlink created in `/etc/nginx/sites-enabled/`
- [ ] Nginx config test passes (`sudo nginx -t`)
- [ ] Default site disabled

### SSL/HTTPS
- [ ] Certbot run successfully
- [ ] Certificate obtained for `matt-hulme.com`
- [ ] Certificate obtained for `www.matt-hulme.com`
- [ ] HTTP redirects to HTTPS
- [ ] Auto-renewal configured

### Permissions
- [ ] All files owned by `www-data:www-data`
- [ ] Correct file permissions (755 for directories, 644 for files)
- [ ] Database file writable by `www-data`
- [ ] Log files writable by `www-data`

## Verification

### Health Checks
- [ ] Backend health endpoint responds: `curl http://localhost:8000/api/health`
- [ ] Public API responds: `curl https://matt-hulme.com/api/health`
- [ ] Projects API returns data: `curl https://matt-hulme.com/api/projects`

### Frontend Testing
- [ ] Homepage loads at `https://matt-hulme.com`
- [ ] All project cards visible (7 projects)
- [ ] Project modal opens and displays correctly
- [ ] Navigation works (Home, Resume, Projects)
- [ ] Resume page loads
- [ ] Resume PDF downloads
- [ ] No console errors in browser DevTools
- [ ] No 404s for static assets

### Routing & Caching
- [ ] Client-side routing works (refresh on `/resume` still works)
- [ ] Static assets have cache headers (check in browser DevTools)
- [ ] API responses not cached
- [ ] Images/videos load correctly

### Security
- [ ] HTTPS enforced (HTTP redirects)
- [ ] SSL certificate valid (no browser warnings)
- [ ] Security headers present (check with browser DevTools)
- [ ] No sensitive data exposed in client-side code
- [ ] CORS restricted to production domain only

### Performance
- [ ] Gzip compression enabled (check response headers)
- [ ] Static assets compressed
- [ ] Page loads in < 3 seconds (on 3G)
- [ ] Core Web Vitals within acceptable range

### Logs
- [ ] Backend logs accessible: `sudo journalctl -u portfolio-backend`
- [ ] Nginx access logs: `/var/log/nginx/portfolio-access.log`
- [ ] Nginx error logs: `/var/log/nginx/portfolio-error.log`
- [ ] No unexpected errors in logs

## Post-Deployment

### Monitoring Setup
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Configure error tracking (optional: Sentry)
- [ ] Schedule database backups
- [ ] Set up log rotation if not already configured

### Documentation
- [ ] Update team/documentation with deployment details
- [ ] Share production URL: `https://matt-hulme.com`
- [ ] Document any custom configurations made

### Testing
- [ ] Run E2E tests (Epic 4.3-4.4) - when implemented
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test with accessibility tools (Epic 4.5)

### Performance Audit
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Optimize any issues found

## Subsequent Deployments

### Before Deploying Updates
- [ ] All tests passing locally
- [ ] Code merged to main branch
- [ ] Build succeeds locally
- [ ] Changes tested in development

### Deployment Process
- [ ] SSH into VPS
- [ ] Run `./deploy.sh` or `./quick-deploy.sh` from local machine
- [ ] Monitor deployment output for errors
- [ ] Verify services restarted successfully

### Post-Update Verification
- [ ] Health check passes
- [ ] New features work as expected
- [ ] No regressions in existing features
- [ ] Check logs for errors

## Rollback Plan

If deployment fails:

1. **Check logs:**
   ```bash
   sudo journalctl -u portfolio-backend -n 100
   sudo tail -100 /var/log/nginx/portfolio-error.log
   ```

2. **Rollback code:**
   ```bash
   cd /var/www/matt-hulme.com
   git log --oneline -10  # Find previous working commit
   git checkout <previous-commit-hash>
   ./deployment/deploy.sh
   ```

3. **Restore database** (if needed):
   ```bash
   sudo cp ~/backups/portfolio-YYYYMMDD.db /var/www/matt-hulme.com/backend/portfolio.db
   sudo chown www-data:www-data /var/www/matt-hulme.com/backend/portfolio.db
   sudo systemctl restart portfolio-backend
   ```

4. **Emergency: Stop backend service temporarily:**
   ```bash
   sudo systemctl stop portfolio-backend
   # Fix issues
   sudo systemctl start portfolio-backend
   ```

## Common Issues

**Backend won't start:**
- Check logs: `sudo journalctl -u portfolio-backend -n 50`
- Verify Python dependencies installed
- Check database file permissions
- Ensure port 8000 not in use

**502 Bad Gateway:**
- Backend service not running
- Check: `sudo systemctl status portfolio-backend`
- Restart: `sudo systemctl restart portfolio-backend`

**Static files not loading:**
- Check Nginx config: `sudo nginx -t`
- Verify files in `/var/www/matt-hulme.com/frontend/dist/`
- Check permissions on dist directory

**SSL Certificate issues:**
- Renew manually: `sudo certbot renew`
- Check cert expiry: `sudo certbot certificates`
- Re-run certbot: `sudo certbot --nginx -d matt-hulme.com`

## Success Criteria

Deployment is successful when:
- ✅ Site accessible at `https://matt-hulme.com`
- ✅ All pages load without errors
- ✅ All features work correctly
- ✅ API responds correctly
- ✅ No errors in logs
- ✅ SSL certificate valid
- ✅ Performance acceptable

---

**Last Updated:** 2024-10-11
**For:** Epic 3 Deployment to GoDaddy VPS
