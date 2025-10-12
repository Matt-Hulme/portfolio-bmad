# Epic 4: Production Deployment & Quality Assurance

**Epic Goal:** Deploy the portfolio to production VPS with proper infrastructure configuration and implement comprehensive E2E test coverage using Playwright to deliver a production-ready, professional portfolio site.

**Value Delivered:** At the end of this epic, the portfolio is live on the internet at matt-hulme.com with proper infrastructure, thoroughly tested with E2E coverage, and ready to share with hiring managers and recruiters.

## Epic Scope
This epic focuses on testing and deployment in the correct order:
1. **Deployment Infrastructure** (Story 4.1) ✅ - Scripts, configs, and documentation
2. **E2E Testing - Core Flows** (Story 4.2) - Critical user journey tests
3. **E2E Testing - Filtering** (Story 4.3) - Interactive feature tests
4. **Accessibility Audit** (Story 4.4) - WCAG 2.1 AA compliance (optional)
5. **Production Deployment** (Story 4.5) - Live deployment to GoDaddy VPS (LAST)

**Deployment is intentionally last** - we test thoroughly before deploying to production.

**Note:** Story 4.6 (Visual Polish & Performance) was removed from scope as the site already meets quality standards from Epic 3 work.

## Story 4.1: Deployment Infrastructure Setup

**As a** developer,
**I want** deployment infrastructure and scripts ready for VPS deployment,
**so that** I can reliably deploy and update the portfolio on the production server.

### Acceptance Criteria

1. ✅ Nginx configuration file created with reverse proxy setup
2. ✅ systemd service unit file created for backend process management
3. ✅ Initial setup script created for first-time VPS configuration
4. ✅ Deployment script created for ongoing updates
5. ✅ Quick deploy script created for remote deployment from local machine
6. ✅ Production environment variable templates created
7. ✅ Comprehensive deployment documentation written (README.md)
8. ✅ Deployment checklist created for step-by-step guidance
9. ✅ All deployment scripts are executable and tested locally
10. Frontend production build verified (< 500KB gzipped main bundle)
11. Backend configuration reviewed for production readiness

### Status
**Partially Complete** - Infrastructure files created, pending actual VPS deployment and testing.

## Story 4.2: Playwright E2E Test Suite - Core Flows

**As a** developer,
**I want** comprehensive E2E tests covering critical user journeys,
**so that** regressions are caught before deployment and core functionality is verified.

### Acceptance Criteria

1. Playwright installed and configured for E2E testing
2. Test: Homepage loads and displays project grid with all 7 projects
3. Test: Project cards display correct data (title, roles, technologies)
4. Test: Clicking project card opens modal with correct project details
5. Test: Modal displays full description, links, and conditionally shows/hides media section
6. Test: Modal closes on Escape key press
7. Test: Modal closes on backdrop click
8. Test: Focus returns to correct card after modal close
9. Test: Navigation between routes (/, /resume) works correctly
10. Test: Active route is visually indicated in navigation
11. Playwright MCP integration available for enhanced debugging and snapshot capabilities
12. All E2E tests pass consistently on local development environment

## Story 4.3: Playwright E2E Test Suite - Filtering & Interactions

**As a** developer,
**I want** E2E tests for filtering and interactive features,
**so that** dynamic functionality is thoroughly validated.

### Acceptance Criteria

1. Test: Technology filter displays all available technologies
2. Test: Selecting technology filter updates grid to show only matching projects
3. Test: Role filter displays all available roles
4. Test: Selecting role filter updates grid to show only matching projects
5. Test: Applying both filters simultaneously works correctly (AND logic)
6. Test: "Clear filters" button resets grid to show all projects
7. Test: "No projects match" message displays when filters return empty results
8. Test: Filter state persists in URL parameters
9. Test: Keyboard navigation works through filter controls
10. Test: Resume page displays and "Download PDF" button triggers download
11. All filtering E2E tests pass consistently

## Story 4.4: Accessibility Audit & Improvements (Optional)

**As a** portfolio visitor with accessibility needs,
**I want** the site to meet WCAG 2.1 AA standards,
**so that** I can fully experience and navigate the portfolio regardless of abilities.

### Acceptance Criteria

1. Automated accessibility scan performed using axe-DevTools or similar (via Chrome DevTools MCP if helpful)
2. All critical and serious accessibility violations resolved
3. Color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
4. All interactive elements are keyboard accessible (Tab, Enter, Escape)
5. Focus indicators are clearly visible on all focusable elements
6. Modal has proper ARIA labels and role attributes
7. Form controls (filters) have proper labels
8. Images have appropriate alt text
9. Heading hierarchy is logical and properly nested
10. Skip navigation link added if navigation is complex
11. Screen reader testing performed on critical flows (at least manual testing with VoiceOver/NVDA)
12. Accessibility documentation added noting compliance level achieved

### Status
**Optional** - May be deferred if site is already sufficiently accessible. Focus on Stories 4.1-4.4 first.

---

## Story 4.5: Production Deployment to GoDaddy VPS

**As a** developer,
**I want** the portfolio deployed to the GoDaddy VPS at matt-hulme.com,
**so that** the site is publicly accessible with proper routing, performance, and security.

### Acceptance Criteria

1. SSH access to GoDaddy VPS confirmed and working
2. DNS A record configured to point matt-hulme.com to VPS IP
3. Initial setup script executed successfully on VPS
4. All E2E tests passing (Stories 4.2-4.3 complete)
5. Accessibility audit complete or deferred (Story 4.4)
6. System packages installed (Node.js, Python, Nginx, certbot)
7. Repository cloned to `/var/www/matt-hulme.com`
8. Frontend built and deployed to production
9. Backend virtual environment created and dependencies installed
10. Database initialized and accessible
11. systemd service running and enabled for auto-start
12. Nginx installed and configured as reverse proxy
13. Nginx routes `/api/*` to FastAPI backend on port 8000
14. Nginx serves frontend static assets
15. SPA routing handled correctly
16. Static asset caching configured
17. SSL/TLS certificate obtained via Let's Encrypt
18. HTTPS enforced (HTTP redirects to HTTPS)
19. Security headers configured
20. File permissions set correctly (www-data ownership)
21. Site accessible at `https://matt-hulme.com`
22. Health check endpoint returns 200 OK
23. All pages load correctly in production
24. API endpoints return expected data
25. Media files load correctly
26. CORS configured appropriately for production domain

### Notes
**This story is intentionally LAST** - we test thoroughly (4.2-4.4) before deploying to production.

---

## Story 4.6: Visual Polish & Performance Optimization

**Status:** ~~REMOVED FROM EPIC 4 SCOPE~~

The visual polish and performance work from Epic 3 is already sufficient. The site:
- Has consistent visual design
- Loads in < 3 seconds
- Frontend bundle is only 103.52 KB gzipped (excellent)
- Mobile responsive design works well
- Smooth transitions and interactions

If performance or visual issues are discovered during deployment or testing, they can be addressed as bugs rather than a dedicated story.

---
