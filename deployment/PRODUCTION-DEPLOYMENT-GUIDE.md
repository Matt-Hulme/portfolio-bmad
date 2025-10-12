# Production Deployment Guide for matt-hulme.com

This guide provides step-by-step instructions for deploying your portfolio to production.

## Pre-Deployment Checklist

Before deploying to production, ensure:

### Code Quality
- [ ] All features merged to `main` branch
- [ ] GitHub Actions CI/CD pipeline passing (green checks)
- [ ] All E2E tests passing (47/47)
- [ ] All unit tests passing (90/90)
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Production build succeeds locally

### Infrastructure Ready
- [ ] SSH access to GoDaddy VPS confirmed
- [ ] VPS IP address known
- [ ] DNS A record for `matt-hulme.com` points to VPS IP
- [ ] DNS propagation complete (test with `nslookup matt-hulme.com`)
- [ ] Have sudo/root privileges on VPS

### Configuration
- [ ] Repository URL configured in deployment scripts: ✅ `https://github.com/Matt-Hulme/portfolio-bmad.git`
- [ ] Domain configured: ✅ `matt-hulme.com`
- [ ] SSL email configured: ✅ `matt@matt-hulme.com`
- [ ] CORS settings updated for production: ✅ Configured with environment variable

## Deployment Process

### Step 1: Initial VPS Setup (One-time only)

1. **SSH into your GoDaddy VPS:**
   ```bash
   ssh your-username@matt-hulme.com
   # or
   ssh your-username@YOUR_VPS_IP
   ```

2. **Run the initial setup script:**
   ```bash
   # Download the deployment scripts
   curl -O https://raw.githubusercontent.com/Matt-Hulme/portfolio-bmad/main/deployment/initial-setup.sh

   # Or clone the repository first
   sudo mkdir -p /var/www/matt-hulme.com
   cd /var/www/matt-hulme.com
   sudo git clone https://github.com/Matt-Hulme/portfolio-bmad.git .

   # Make script executable and run it
   sudo chmod +x deployment/initial-setup.sh
   sudo bash deployment/initial-setup.sh
   ```

3. **What the script does:**
   - Updates system packages
   - Installs Node.js 20 LTS, Python 3, Nginx, Certbot
   - Clones your repository
   - Builds frontend production bundle
   - Sets up backend Python virtual environment
   - Creates systemd service for backend
   - Configures Nginx with SSL
   - Sets up Let's Encrypt SSL certificates
   - Configures firewall (UFW)
   - Sets proper file permissions

4. **Monitor the script output:**
   - Watch for any errors (red ✗ symbols)
   - SSL setup requires DNS to be pointing to your server
   - Press Enter when prompted for SSL certificate setup

### Step 2: Verify Initial Deployment

After initial setup completes, verify everything works:

```bash
# 1. Check backend service
sudo systemctl status portfolio-backend
# Should show "active (running)"

# 2. Test backend health
curl http://localhost:8000/api/health
# Should return: {"status":"ok","version":"1.0.0"}

# 3. Check Nginx
sudo systemctl status nginx
# Should show "active (running)"

# 4. Test SSL/HTTPS
curl https://matt-hulme.com/api/health
# Should return health check response

# 5. Visit site in browser
# https://matt-hulme.com
```

### Step 3: Post-Deployment Configuration

1. **Set up production environment variables (optional):**
   ```bash
   # Backend .env
   cd /var/www/matt-hulme.com/backend
   sudo nano .env
   ```
   Add:
   ```
   ALLOWED_ORIGINS=https://matt-hulme.com,https://www.matt-hulme.com
   ```

2. **Verify logs:**
   ```bash
   # Backend logs
   sudo journalctl -u portfolio-backend -n 50

   # Nginx logs
   sudo tail -f /var/log/nginx/portfolio-access.log
   sudo tail -f /var/log/nginx/portfolio-error.log
   ```

3. **Test all features:**
   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] Project filtering works
   - [ ] Project modals open
   - [ ] Resume page loads
   - [ ] Resume PDF downloads
   - [ ] No console errors in browser DevTools

## Deploying Updates

After initial setup, deploy code updates:

### Method 1: SSH Deployment (Current)

```bash
# 1. SSH into VPS
ssh your-username@matt-hulme.com

# 2. Navigate to deployment directory
cd /var/www/matt-hulme.com/deployment

# 3. Run deployment script
./deploy.sh
```

The script will:
- Pull latest code from main branch
- Install dependencies
- Build frontend
- Restart backend service
- Reload Nginx
- Run health checks

### Method 2: Local Quick Deploy

From your local machine:

```bash
# Update and test script first
nano deployment/quick-deploy.sh
# Set SERVER_USER to your VPS username

# Run deployment
./deployment/quick-deploy.sh
```

### Method 3: Automated CI/CD (Future)

To enable automated deployment after GitHub Actions CI passes:

1. **Add GitHub Secrets:**
   - Go to: https://github.com/Matt-Hulme/portfolio-bmad/settings/secrets/actions
   - Add secrets:
     - `VPS_HOST`: Your VPS IP address
     - `VPS_USER`: SSH username
     - `VPS_SSH_KEY`: Private SSH key

2. **Uncomment automated deployment section:**
   Edit `.github/workflows/ci-cd.yml` and uncomment the SSH deployment step.

3. **Test:**
   Push to main branch and watch GitHub Actions deploy automatically!

## Monitoring & Maintenance

### Health Checks

```bash
# Quick health check
curl https://matt-hulme.com/api/health

# Check all services
sudo systemctl status portfolio-backend nginx
```

### View Logs

```bash
# Backend logs (live)
sudo journalctl -u portfolio-backend -f

# Nginx access logs
sudo tail -f /var/log/nginx/portfolio-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/portfolio-error.log
```

### SSL Certificate Renewal

Let's Encrypt certificates auto-renew. To manually renew:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

Test renewal:
```bash
sudo certbot renew --dry-run
```

### Database Backup

```bash
# Create backup
sudo cp /var/www/matt-hulme.com/backend/portfolio.db ~/portfolio-backup-$(date +%Y%m%d).db

# Restore backup
sudo cp ~/portfolio-backup-YYYYMMDD.db /var/www/matt-hulme.com/backend/portfolio.db
sudo chown www-data:www-data /var/www/matt-hulme.com/backend/portfolio.db
sudo systemctl restart portfolio-backend
```

### Performance Monitoring

Run Lighthouse audit:
```bash
# From local machine
cd frontend
npm run lighthouse
```

Check Core Web Vitals in production at:
- https://pagespeed.web.dev/
- Chrome DevTools > Lighthouse

## Troubleshooting

### Backend Won't Start

```bash
# Check status
sudo systemctl status portfolio-backend

# View detailed logs
sudo journalctl -u portfolio-backend -n 100

# Check port 8000
sudo lsof -i :8000

# Test manually
cd /var/www/matt-hulme.com/backend
source .venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### 502 Bad Gateway

Backend isn't running:
```bash
sudo systemctl restart portfolio-backend
sudo systemctl status portfolio-backend
```

### Frontend Not Updating

```bash
# Clear cache and rebuild
cd /var/www/matt-hulme.com/frontend
npm run build
sudo systemctl reload nginx
```

### SSL Certificate Issues

```bash
# Check certificates
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Permission Errors

```bash
# Reset permissions
sudo chown -R www-data:www-data /var/www/matt-hulme.com
sudo chmod -R 755 /var/www/matt-hulme.com
```

## Rollback Procedure

If deployment fails:

```bash
# 1. Find previous working commit
cd /var/www/matt-hulme.com
git log --oneline -10

# 2. Rollback
git checkout <previous-commit-hash>
./deployment/deploy.sh

# 3. Restore database if needed
sudo cp ~/backups/portfolio-YYYYMMDD.db /var/www/matt-hulme.com/backend/portfolio.db
sudo systemctl restart portfolio-backend
```

## Performance Targets

After deployment, verify performance meets targets:

**Lighthouse Scores:**
- Performance: ≥90%
- Accessibility: ≥95%
- Best Practices: ≥90%
- SEO: ≥90%

**Core Web Vitals:**
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <300ms
- Speed Index: <3s

**Resource Budgets:**
- JavaScript: <300KB (currently ~183KB gzipped) ✅
- CSS: <50KB (currently ~9KB gzipped) ✅
- Images: <500KB per page
- Fonts: <100KB

## Security Checklist

- [x] HTTPS enabled with valid SSL certificate
- [x] Backend runs as `www-data` user (not root)
- [x] Firewall configured (UFW)
- [x] CORS restricted to production domain
- [ ] Regular security updates scheduled
- [ ] Database backups automated
- [ ] Log rotation configured
- [ ] Rate limiting (optional, can add to Nginx)

## Next Steps After Deployment

1. **Set up monitoring:**
   - UptimeRobot for uptime monitoring
   - Error tracking (e.g., Sentry)
   - Analytics integration in `reportWebVitals.ts`

2. **Schedule backups:**
   ```bash
   # Add to crontab
   crontab -e
   # Add: 0 2 * * * cp /var/www/matt-hulme.com/backend/portfolio.db ~/backups/portfolio-$(date +\%Y\%m\%d).db
   ```

3. **Monitor performance:**
   - Weekly Lighthouse audits
   - Core Web Vitals tracking
   - Error logs review

4. **Plan updates:**
   - Epic 5 features
   - Content updates
   - Performance optimizations

## Support & Resources

- **Repository:** https://github.com/Matt-Hulme/portfolio-bmad
- **Deployment scripts:** `/deployment/` directory
- **Documentation:** `deployment/README.md`, `deployment/DEPLOYMENT-CHECKLIST.md`
- **CI/CD Pipeline:** `.github/workflows/ci-cd.yml`
- **Performance docs:** `frontend/PERFORMANCE.md`

---

**Ready to deploy?** Start with Step 1 above! 🚀
