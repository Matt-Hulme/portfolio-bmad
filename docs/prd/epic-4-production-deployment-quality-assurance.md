# Epic 4: Production Deployment & Quality Assurance

**Epic Goal:** Deploy the portfolio to production VPS with proper infrastructure configuration, implement comprehensive E2E test coverage using Playwright, and apply final accessibility and visual polish to deliver a production-ready, professional portfolio site.

**Value Delivered:** At the end of this epic, the portfolio is live on the internet with proper infrastructure, thoroughly tested with E2E coverage, accessible to all users, and polished to professional standards. The site is ready to share with hiring managers and recruiters.

## Story 4.1: Production Build Configuration

**As a** developer,
**I want** optimized production builds for both frontend and backend,
**so that** the deployed site is performant and properly configured for production use.

### Acceptance Criteria

1. Frontend production build configured with Vite (minification, code splitting, asset optimization)
2. Environment variable handling configured for frontend (production API base URL)
3. Backend production configuration created (proper logging, error handling, security headers)
4. SQLite database file location configured for production (persistent storage path)
5. Production build script creates optimized static assets
6. Build output size is reasonable (frontend bundle < 500KB gzipped as baseline target)
7. Source maps configured appropriately (excluded from production or restricted)
8. Production build runs successfully locally for testing
9. Build documentation added to deployment guide

## Story 4.2: VPS Deployment & Nginx Configuration

**As a** developer,
**I want** the portfolio deployed to VPS with Nginx reverse proxy,
**so that** the site is publicly accessible with proper routing and performance.

### Acceptance Criteria

1. VPS access configured and deployment user created
2. Nginx installed and configured as reverse proxy
3. Nginx routes `/api/*` requests to FastAPI backend (uvicorn/gunicorn)
4. Nginx serves frontend static assets for all other routes
5. Nginx configured with proper caching headers for static assets
6. SPA routing handled correctly (all frontend routes return index.html)
7. SSL/TLS certificate configured (Let's Encrypt or similar) for HTTPS
8. systemd service unit created for FastAPI backend process
9. Backend service starts automatically on server reboot
10. Deployment script or documentation created for future updates
11. Site is accessible via public domain/IP with HTTPS
12. Health check endpoint (`/api/health`) returns 200 OK from production

## Story 4.3: Playwright E2E Test Suite - Core Flows

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

## Story 4.4: Playwright E2E Test Suite - Filtering & Interactions

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

## Story 4.5: Accessibility Audit & Improvements

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

## Story 4.6: Visual Polish & Performance Optimization

**As a** portfolio visitor,
**I want** a polished, fast-loading site with smooth interactions,
**so that** my first impression is positive and the site reflects professional quality.

### Acceptance Criteria

1. Visual consistency audit performed across all pages and components
2. Spacing, alignment, and typography are consistent throughout
3. Hover states and transitions are smooth and professional
4. Loading states are polished (skeleton loaders or spinners)
5. Error states have clear, user-friendly messaging
6. Images are optimized (compressed, appropriate formats, lazy loading if applicable)
7. Performance audit performed using Chrome DevTools MCP (Lighthouse or performance profiling)
8. Core Web Vitals measured and meet reasonable targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
9. Any identified performance issues addressed (code splitting, asset optimization, etc.)
10. Mobile experience tested on real devices or emulators and polished
11. Cross-browser testing performed (Chrome, Firefox, Safari)
12. Final visual QA pass completed and documented

---
