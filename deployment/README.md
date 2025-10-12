# Portfolio Deployment Guide

This guide walks through deploying the portfolio application to your GoDaddy VPS at `matt-hulme.com`.

## Prerequisites

- GoDaddy VPS with Ubuntu/Debian
- SSH access to the VPS
- Domain DNS configured to point to your VPS IP address
- Git repository with your code (GitHub, GitLab, etc.)

## Architecture Overview

**Frontend (React + Vite)**
- Built as static files
- Served by Nginx
- Client-side routing handled by React Router

**Backend (FastAPI + SQLite)**
- Runs as a systemd service
- Managed by uvicorn with 2 workers
- Proxied through Nginx at `/api` path

**Nginx**
- Serves static frontend files
- Reverse proxy for backend API
- SSL/TLS termination
- Media file caching

## Initial Deployment (First Time Setup)

### 1. Prerequisites Check

Before deploying, ensure:
- [ ] All code is merged to `main` branch
- [ ] GitHub Actions CI/CD pipeline is passing
- [ ] You have SSH access to your GoDaddy VPS
- [ ] DNS A record for `matt-hulme.com` points to your VPS IP
- [ ] You have `sudo` privileges on the VPS

Repository is pre-configured with:
- Repository URL: `https://github.com/Matt-Hulme/portfolio-bmad.git`
- Domain: `matt-hulme.com`
- SSL email: `matt@matt-hulme.com`

### 2. SSH into Your VPS

```bash
ssh your-username@matt-hulme.com
# or
ssh your-username@YOUR_VPS_IP
```

### 3. Upload Deployment Files

Option A: Clone the repository first (recommended)
```bash
# Create deployment directory
sudo mkdir -p /var/www/matt-hulme.com
cd /var/www/matt-hulme.com

# Clone your repository
sudo git clone https://github.com/yourusername/portfolio-bmad.git .
```

Option B: Upload files manually via SCP
```bash
# From your local machine
scp -r deployment your-username@matt-hulme.com:/tmp/
```

### 4. Run Initial Setup Script

```bash
cd /var/www/matt-hulme.com/deployment
sudo bash initial-setup.sh
```

This script will:
- Update system packages
- Install Node.js, Python, Nginx, and other dependencies
- Set up the frontend and backend applications
- Create systemd service for the backend
- Configure Nginx
- Set up SSL with Let's Encrypt
- Set proper file permissions

**Important:** The script will prompt you for SSL setup. Make sure your domain DNS is pointing to the server before proceeding with the certbot step.

### 5. Manual Configuration Updates

After initial setup, you may need to:

**Update certbot email:**
```bash
# Edit the email in initial-setup.sh line
certbot --nginx -d matt-hulme.com -d www.matt-hulme.com --email your-email@example.com
```

**Update CORS settings for production:**

Edit `/var/www/matt-hulme.com/backend/app/main.py` to restrict CORS:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://matt-hulme.com", "https://www.matt-hulme.com"],
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)
```

### 6. Verify Deployment

Check that services are running:
```bash
# Backend service
sudo systemctl status portfolio-backend

# Nginx
sudo systemctl status nginx

# Test API endpoint
curl http://localhost:8000/api/health

# Test public site
curl https://matt-hulme.com/api/health
```

View logs:
```bash
# Backend logs
sudo journalctl -u portfolio-backend -f

# Nginx access logs
sudo tail -f /var/log/nginx/portfolio-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/portfolio-error.log
```

## CI/CD Pipeline

The repository includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that automatically:

**On Pull Requests:**
- Runs frontend linting, TypeScript checking, and unit tests
- Runs backend import validation
- Executes E2E test suite with Playwright
- Runs Lighthouse performance audit
- Must pass before merging to main

**On Main Branch Push:**
- Runs all CI checks
- Creates deployable build artifacts
- Displays deployment instructions

**Manual Deployment:**
Currently configured for manual deployment via SSH. The workflow provides deployment instructions after successful builds.

**Future: Automated Deployment**
To enable automated deployment, add GitHub Secrets:
- `VPS_HOST`: Your VPS IP address
- `VPS_USER`: SSH username (e.g., `root` or your user)
- `VPS_SSH_KEY`: Private SSH key for authentication

Then uncomment the automated deployment section in `.github/workflows/ci-cd.yml`.

## Deploying Updates

After initial setup, deploy code updates using the deployment script:

### 1. SSH into VPS

```bash
ssh your-username@matt-hulme.com
```

### 2. Run Deployment Script

```bash
cd /var/www/matt-hulme.com/deployment
./deploy.sh
```

The script will:
- Pull latest code from git
- Install dependencies
- Build frontend
- Restart backend service
- Reload Nginx
- Verify deployment with health checks

### Manual Deployment Steps

If you prefer manual deployment or the script fails:

```bash
cd /var/www/matt-hulme.com

# Pull latest code
git pull origin main

# Build frontend
cd frontend
npm ci
npm run build

# Update backend
cd ../backend
source .venv/bin/activate
pip install -r requirements.txt

# Restart services
sudo systemctl restart portfolio-backend
sudo systemctl reload nginx

# Verify
curl http://localhost:8000/api/health
```

## Database Management

The SQLite database is located at `/var/www/matt-hulme.com/backend/portfolio.db`.

**Backup database:**
```bash
cp /var/www/matt-hulme.com/backend/portfolio.db ~/portfolio-backup-$(date +%Y%m%d).db
```

**Restore database:**
```bash
sudo cp ~/portfolio-backup-YYYYMMDD.db /var/www/matt-hulme.com/backend/portfolio.db
sudo chown www-data:www-data /var/www/matt-hulme.com/backend/portfolio.db
sudo systemctl restart portfolio-backend
```

**Update database schema** (if needed after migrations):
```bash
cd /var/www/matt-hulme.com/backend
source .venv/bin/activate
# Run your migration scripts here
sudo systemctl restart portfolio-backend
```

## SSL Certificate Renewal

Let's Encrypt certificates auto-renew via cron. To manually renew:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

Test renewal process:
```bash
sudo certbot renew --dry-run
```

## Troubleshooting

### Backend won't start

```bash
# Check service status
sudo systemctl status portfolio-backend

# View detailed logs
sudo journalctl -u portfolio-backend -n 100

# Check if port 8000 is in use
sudo lsof -i :8000

# Test backend manually
cd /var/www/matt-hulme.com/backend
source .venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Nginx errors

```bash
# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/portfolio-error.log

# Restart Nginx
sudo systemctl restart nginx
```

### 502 Bad Gateway

This usually means the backend isn't running:
```bash
sudo systemctl status portfolio-backend
sudo systemctl restart portfolio-backend
```

### Frontend not updating

Clear browser cache or rebuild frontend:
```bash
cd /var/www/matt-hulme.com/frontend
npm run build
sudo systemctl reload nginx
```

### Permission errors

Reset permissions:
```bash
sudo chown -R www-data:www-data /var/www/matt-hulme.com
sudo chmod -R 755 /var/www/matt-hulme.com
```

## File Structure on Server

```
/var/www/matt-hulme.com/
├── backend/
│   ├── .venv/              # Python virtual environment
│   ├── app/                # FastAPI application
│   ├── portfolio.db        # SQLite database
│   └── requirements.txt
├── frontend/
│   ├── dist/               # Built static files (served by Nginx)
│   ├── src/
│   └── package.json
├── deployment/
│   ├── nginx.conf          # Nginx configuration
│   ├── portfolio-backend.service
│   ├── deploy.sh
│   └── initial-setup.sh
└── static/
    └── images/             # Media files served by backend
```

## Useful Commands

```bash
# Service Management
sudo systemctl start portfolio-backend
sudo systemctl stop portfolio-backend
sudo systemctl restart portfolio-backend
sudo systemctl status portfolio-backend
sudo systemctl enable portfolio-backend   # Enable auto-start on boot

# Nginx Management
sudo systemctl reload nginx    # Reload config without dropping connections
sudo systemctl restart nginx   # Full restart
sudo nginx -t                  # Test configuration

# Logs
sudo journalctl -u portfolio-backend -f              # Follow backend logs
sudo tail -f /var/log/nginx/portfolio-access.log    # Nginx access logs
sudo tail -f /var/log/nginx/portfolio-error.log     # Nginx error logs

# Process Management
ps aux | grep uvicorn          # Find backend process
sudo kill -HUP $(cat /var/run/nginx.pid)  # Reload Nginx

# Disk Space
df -h                          # Check disk usage
du -sh /var/www/matt-hulme.com/*  # Check directory sizes
```

## Performance Monitoring

### Check Core Web Vitals

Use Chrome DevTools Lighthouse or PageSpeed Insights:
- https://pagespeed.web.dev/

### Monitor Server Resources

```bash
# CPU and Memory
top
htop  # if installed

# Disk I/O
iotop  # if installed

# Network
iftop  # if installed
```

## Security Checklist

- [x] SSL/TLS enabled (HTTPS)
- [x] Backend runs as www-data user (not root)
- [x] Firewall configured (UFW)
- [x] CORS restricted to domain only (update in production)
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] Database backups scheduled
- [ ] Log rotation configured
- [ ] Rate limiting (optional, can add to Nginx)

## Next Steps

After successful deployment:

1. **Test all functionality:**
   - Homepage loads
   - Project filtering works
   - Project modals open
   - Resume page displays
   - Resume PDF downloads

2. **Run E2E tests** (from Epic 4.3-4.4)

3. **Performance audit** (Epic 4.6)

4. **Accessibility audit** (Epic 4.5)

5. **Set up monitoring:**
   - Consider tools like UptimeRobot for uptime monitoring
   - Set up error tracking (e.g., Sentry)

6. **Schedule regular backups:**
   ```bash
   # Add to crontab
   0 2 * * * cp /var/www/matt-hulme.com/backend/portfolio.db ~/backups/portfolio-$(date +\%Y\%m\%d).db
   ```

## Support

For issues or questions:
- Check the troubleshooting section above
- Review service logs
- Consult the PRD documents in `/docs/prd/`
- Epic 4 documentation: `docs/prd/epic-4-production-deployment-quality-assurance.md`
