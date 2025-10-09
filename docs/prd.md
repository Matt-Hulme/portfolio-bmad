# Portfolio Site v2 Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Create a professional portfolio showcasing diverse skillset across frontend development, AI engineering, data analysis, product work, and marketing
- Demonstrate technical depth and business acumen through 7 carefully selected projects
- Provide smooth, polished user experience with responsive design and fast performance
- Enable hiring managers to quickly assess candidate fit with dynamic filtering and clear presentation
- Establish professional web presence with direct contact methods and resume access

### Background Context

This portfolio site serves as a comprehensive professional showcase for a senior engineering candidate with expertise spanning multiple technical and business domains. The current landscape requires engineering candidates to demonstrate not just technical implementation skills but also strategic thinking, business acumen, and cross-functional capabilities including marketing. This site addresses that need by presenting carefully curated projects that highlight both depth and breadth, with an emphasis on measurable impact and real-world problem-solving.

The target audience—hiring managers, recruiters, and technical leads—needs to quickly evaluate candidates across multiple dimensions. By combining project filtering, clear technology visualization, and accessible contact methods, this portfolio streamlines that evaluation process while maintaining a professional, cohesive first impression.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-06 | 1.0 | Initial PRD creation | John (PM Agent) |

---

## Requirements

### Functional Requirements

**FR1:** The system shall display a combined home page featuring project showcase grid with filtering capabilities

**FR2:** The system shall provide dynamic filtering by technology and role for project cards

**FR3:** The system shall open project details in a modal dialog (no full-page routes) with keyboard navigation and focus management

**FR4:** The system shall display project cards showing title, summary, roles badges, technology line, and optional "alive" links

**FR5:** The system shall conditionally hide media sections in project detail modals when no images are available

**FR6:** The system shall provide a dedicated resume page at `/resume` with styled HTML view and PDF download link

**FR7:** The system shall provide a contact page at `/contact` with links to X, LinkedIn, and email

**FR8:** The system shall expose REST API endpoints: `GET /api/projects` (list all) and `GET /api/projects/{slug}` (single project)

**FR9:** The system shall return HTTP 200 for existing projects and HTTP 404 for missing project slugs

**FR10:** The system shall support responsive layout across mobile, tablet, and desktop breakpoints

### Non-Functional Requirements

**NFR1:** Page load times must achieve sub-second performance for initial render

**NFR2:** The system must maintain responsive performance with optimized asset loading

**NFR3:** All interactive elements must meet WCAG 2.1 accessibility standards

**NFR4:** Modal interactions must include keyboard navigation (Escape to close) and proper focus management

**NFR6:** The system must maintain professional visual presentation consistent with portfolio positioning

**NFR7:** The system must be deployable to VPS with Nginx reverse proxy and systemd service configuration

---

## User Interface Design Goals

### Overall UX Vision

The portfolio should feel like a curated gallery—clean, focused, and professional. Emphasis on content over decoration. Navigation should be intuitive and unobtrusive. The modal-based project detail pattern creates a focused viewing experience without losing context of the overall portfolio. Every interaction should reinforce the perception of technical competence and attention to detail.

### Key Interaction Paradigms

- **Card-based browsing**: Grid of project cards as primary discovery mechanism
- **Modal-based detail view**: Focus on individual project without navigation overhead
- **Filter-driven exploration**: Dynamic filtering allows users to slice by technology or role
- **Keyboard-first accessibility**: All interactions must be keyboard-navigable (Tab, Enter, Escape)
- **Responsive-first approach**: Mobile experience is co-equal with desktop, not an afterthought

### Core Screens and Views

1. **Home + Projects Grid** (combined landing page)
2. **Project Detail Modal** (overlay, not routed)
3. **Resume Page** (`/resume`)
4. **Contact Page** (`/contact`)

### Accessibility: WCAG AA

Target WCAG 2.1 Level AA compliance with focus on keyboard navigation, semantic HTML, proper ARIA labels for modals, and sufficient color contrast.

### Branding

**Design Direction: "Hacker Minimalist"**

Clean terminal/hacker aesthetic with muted green accents on dark background. Professional and modern while signaling technical depth. Key characteristics:

- **Color Palette**: Muted green (#7fda89) as primary accent on very dark background (#0f0f0f)
- **Typography**: Monospace fonts (SF Mono, Courier New) for terminal feel
- **Visual Elements**: Left border accents on cards, `$` prompt on tech lines, subtle hover effects
- **Visual Hierarchy**: Green used strategically for interactive elements and accents—most content stays in comfortable gray tones to avoid overwhelming the page
- **Philosophy**: Terminal touches without overwhelming; content over decoration

Use shadcn/ui component library as baseline, customized with terminal-inspired styling via Tailwind.

### Target Platforms: Web Responsive

Optimized for desktop, tablet, and mobile browsers. Single responsive implementation covering all breakpoints. No native mobile app or platform-specific versions.

---

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing both frontend (React/Vite) and backend (FastAPI) codebases, facilitating coordinated development and simplified deployment.

### Service Architecture

**Monolithic architecture with clear frontend/backend separation:**
- Frontend: React SPA served as static assets
- Backend: FastAPI REST API server
- Development: Vite dev server proxies API requests to FastAPI backend
- Production: Nginx reverse proxy routes `/api/*` to FastAPI, serves React static build for all other routes

This approach provides simplicity for a portfolio site while maintaining clean separation of concerns. No microservices or serverless complexity needed for this scale.

### Testing Requirements

**Comprehensive testing at all levels where it makes sense:**

**Frontend Testing:**
- **Vitest** - Unit and integration tests for utilities, hooks, and logic
- **React Testing Library** - Component testing with user-centric approach
- **Playwright** - E2E testing covering critical user flows (grid render, modal interactions, resume/contact pages)
- **Playwright MCP** - Enhanced browser automation with snapshots, interactions, and visual testing capabilities

**Backend Testing:**
- **pytest** - Unit and integration tests for API endpoints and business logic
- **pytest-asyncio** - Testing FastAPI async endpoints
- **Test fixtures** - Reusable test data and temporary database setup

**Development & Debugging Tools:**
- **Chrome DevTools MCP** - Performance profiling, network inspection, Core Web Vitals measurement, and browser debugging during development

Focus on testing where it provides clear value: user-facing functionality, business logic, and integration points. Avoid over-testing implementation details.

### Additional Technical Assumptions and Requests

**Frontend Stack:**
- React 19.1.1 with TypeScript 5.8+ for type safety
- Vite 7.1.4 for build tooling and dev server
- TailwindCSS 4.1.13 for utility-first styling
- shadcn/ui 3.0+ component library (Button, Card, Badge, Dialog baseline)
- React Router for client-side routing

**Backend Stack:**
- FastAPI 0.115.5 for REST API framework
- Python 3.13.7 runtime
- SQLAlchemy 2.0.36 for ORM and database interaction

**Database:**
- SQLite for both development and production (simpler deployment, sufficient for portfolio scale)

**Development Tooling:**
- ESLint for JavaScript/TypeScript linting
- Prettier for code formatting
- Ruff for Python linting
- Black for Python formatting

**AI Development Environment:**
- BMAD agent system for coordinated PM/Architect/UX/Dev workflows
- Playwright MCP and Chrome DevTools MCP available across Claude Code, Cursor, and Codex
- File-based handoff between AI tools using shared repository state

**Deployment:**
- VPS deployment with Nginx reverse proxy
- systemd service units for process management
- Basic deployment scripts and documentation

**Design System:**
- Tailwind tokens configured for consistent spacing, colors, typography
- shadcn/ui components as baseline (customizable with Tailwind)

---

## Epic List

### Epic 1: Foundation & Core Project Showcase
**Goal:** Establish project foundation with design system, app shell, routing, and deliver the primary portfolio value—a working project showcase with filtering and modal-based detail views.

### Epic 2: Complete Portfolio Experience
**Goal:** Add dynamic backend API for project data, complete the site with resume and contact pages, enabling a fully functional portfolio with all required pages and data sources.

### Epic 3: Production Deployment & Quality Assurance
**Goal:** Deploy to production VPS with proper infrastructure, complete E2E test coverage, and apply final accessibility and visual polish to deliver a production-ready portfolio.

---

## Epic 1: Foundation & Core Project Showcase

**Epic Goal:** Establish a solid technical foundation with modern tooling, responsive design system, and deliver the core portfolio value proposition—a fully functional project showcase featuring filterable project cards and modal-based detail views. This epic delivers a deployable portfolio that demonstrates technical capability even without backend API integration.

**Value Delivered:** At the end of this epic, you have a working portfolio site that can be demoed to hiring managers, showcasing your projects with professional presentation and smooth interactions. The site is responsive, accessible, and demonstrates technical polish.

### Story 1.1: Project Foundation & Tooling Setup

**As a** developer,
**I want** a properly configured React + TypeScript + Vite project with Tailwind and shadcn/ui,
**so that** I have a solid foundation for building the portfolio with modern tooling and type safety.

#### Acceptance Criteria

1. Vite project initialized with React 19.1.1 and TypeScript 5.8+ template
2. TailwindCSS 4.1.13 installed and configured with basic configuration
3. shadcn/ui 3.0+ CLI installed and initialized with default configuration
4. ESLint and Prettier configured for code quality and formatting
5. Basic folder structure created (src/components, src/pages, src/lib, src/types)
6. Vite dev server runs successfully with "Hello World" placeholder
7. TypeScript compilation succeeds with no errors
8. Unit test setup complete with Vitest and basic smoke test passes

### Story 1.2: Design System Foundation

**As a** developer,
**I want** Tailwind design tokens configured and core shadcn/ui components installed,
**so that** the application has a consistent, professional design system to build upon.

#### Acceptance Criteria

1. Tailwind config extended with custom color palette, spacing scale, and typography tokens
2. shadcn/ui components installed: Button, Card, Badge, Dialog
3. Global CSS configured with Tailwind base styles and custom CSS variables
4. Responsive breakpoint strategy documented (mobile-first approach)
5. Basic layout container component created with max-width and padding
6. Typography styles established (headings, body, links)
7. Component showcase page created demonstrating installed shadcn components
8. Design system is visually cohesive across different viewport sizes

### Story 1.3: Application Shell & Navigation

**As a** portfolio visitor,
**I want** clear navigation and proper routing between pages,
**so that** I can easily explore different sections of the portfolio.

#### Acceptance Criteria

1. React Router installed and configured with route definitions for `/`, `/resume`, `/contact`
2. Navigation component created with links to all main pages
3. Navigation is responsive (mobile: hamburger or simplified; desktop: full horizontal nav)
4. Active route is visually indicated in navigation
5. Page layout component wraps all routes with consistent header/footer structure
6. Smooth transitions between routes (no flash of unstyled content)
7. 404 page created for invalid routes
8. Keyboard navigation works (Tab through nav links, Enter to activate)

### Story 1.4: Project Data Model & Mock Data

**As a** developer,
**I want** TypeScript interfaces for project data and comprehensive mock data,
**so that** I can develop the UI with realistic content before backend integration.

#### Acceptance Criteria

1. TypeScript interfaces defined for Project, Technology, Role, Industry types
2. Mock data file created with 7 complete project entries
3. Each project includes: title, slug, summary, description, roles[], technologies[], industry, links (optional), images[] (optional)
4. Mock data includes variety of: frontend projects, backend projects, AI/ML projects, data projects, product projects, marketing projects
5. At least 2 projects have "alive" links, at least 3 have images, at least 2 have neither
6. Data structure supports filtering by technology and role
7. TypeScript types are exported and reusable across components
8. Mock data helper functions created (e.g., getAllProjects(), getProjectBySlug())

### Story 1.5: Project Grid Display

**As a** portfolio visitor,
**I want** to see all projects displayed in an attractive, scannable grid,
**so that** I can quickly browse the portfolio and identify projects of interest.

#### Acceptance Criteria

1. Project card component created using shadcn Card
2. Card displays: project title, one-line summary, role badges, technology line
3. Role badges use shadcn Badge component with appropriate styling
4. Technology line shows comma-separated tech stack (truncate with ellipsis if too long)
5. "Alive" link indicator shown for projects with live URLs (icon or badge)
6. Grid layout is responsive (1 column mobile, 2 columns tablet, 3 columns desktop)
7. Cards have hover state indicating they are clickable
8. All 7 mock projects render correctly in the grid
9. Grid is visually balanced and professional
10. React Testing Library tests verify card rendering and data display

### Story 1.6: Project Filtering System

**As a** portfolio visitor,
**I want** to filter projects by technology or role,
**so that** I can quickly find projects relevant to my interests or hiring needs.

#### Acceptance Criteria

1. Filter controls component created with dropdowns/buttons for Technology and Role
2. Technology filter populated dynamically from all technologies used across projects
3. Role filter populated dynamically from all roles across projects (e.g., Frontend Dev, Backend Dev, Full-Stack, AI Engineer, Data Analyst, Product Manager, Marketing)
4. Client-side filtering logic updates grid display instantly
5. Multiple filters can be applied simultaneously (AND logic: show projects matching selected tech AND selected role)
6. Active filters are visually indicated
7. "Clear filters" button resets all filters and shows all projects
8. Filter UI is responsive (collapsible on mobile, visible on desktop)
9. Grid shows "No projects match your filters" message when no results
10. URL parameters update to reflect active filters (shareable filtered view)
11. Vitest unit tests verify filtering logic for various filter combinations

### Story 1.7: Project Detail Modal

**As a** portfolio visitor,
**I want** to view full project details in a focused modal overlay,
**so that** I can learn more about a project without losing my place in the grid.

#### Acceptance Criteria

1. Modal opens when project card is clicked
2. Modal uses shadcn Dialog component with proper accessibility
3. Modal displays: full title, full description (markdown support), roles, technologies, links section, media section
4. Links section shows "alive" links and any other project URLs (GitHub, case study, etc.)
5. Media section conditionally hidden when project has no images
6. Media section displays project images in gallery format when present
7. Modal closes on Escape key press
8. Modal closes when clicking backdrop or close button
9. Focus is trapped within modal when open (Tab cycles through modal elements only)
10. Focus returns to clicked card when modal closes
11. Modal is responsive (full screen on mobile, centered overlay on desktop)
12. Smooth open/close animations
13. React Testing Library tests verify modal open/close and keyboard navigation

---

## Epic 2: Complete Portfolio Experience

**Epic Goal:** Transform the frontend showcase into a complete, data-driven portfolio by integrating a FastAPI backend for project data management, and adding resume and contact pages to deliver all essential portfolio functionality. This epic completes the feature set, making the portfolio fully functional and content-complete.

**Value Delivered:** At the end of this epic, the portfolio has all planned features working together: dynamic project data from a real API, professional resume presentation with PDF download, and clear contact pathways. The site is feature-complete and ready for comprehensive testing and deployment.

### Story 2.1: FastAPI Project Setup & Basic Server

**As a** developer,
**I want** a properly configured FastAPI backend with project structure and development server,
**so that** I have a foundation for building REST API endpoints.

#### Acceptance Criteria

1. FastAPI 0.115.5 project initialized in backend/ directory (or similar structure within monorepo)
2. Python 3.13.7 virtual environment configured with dependencies (FastAPI, SQLAlchemy 2.0.36, pytest, pytest-asyncio)
3. Basic FastAPI app created with health check endpoint (`GET /api/health`)
4. Ruff and Black configured for Python linting and formatting
5. Basic folder structure created (app/routers, app/models, app/schemas, tests/)
6. CORS middleware configured to allow frontend development server origin
7. Backend dev server runs successfully and health check returns 200 OK
8. pytest setup complete with basic health check test passing
9. README or docs include instructions for running backend server

### Story 2.2: Database Models & SQLAlchemy Setup

**As a** developer,
**I want** SQLAlchemy models for projects and related data with SQLite database,
**so that** I can persist and query project data for the API.

#### Acceptance Criteria

1. SQLAlchemy base configuration created with SQLite database connection
2. Project model created with fields: id, title, slug, summary, description, industry, created_at, updated_at
3. Technology model created with many-to-many relationship to Project
4. Role model created with many-to-many relationship to Project
5. ProjectLink model created for storing project URLs (type: alive/github/case_study, url, label)
6. ProjectImage model created for storing image references (url, alt_text, order)
7. Database initialization script creates tables
8. Seed data script populates database with the 7 mock projects from Story 1.4
9. SQLAlchemy queries tested with pytest fixtures using temporary test database
10. Database schema supports all data fields currently displayed in frontend

### Story 2.3: Projects API Endpoints

**As a** frontend developer,
**I want** REST API endpoints to retrieve project data,
**so that** the portfolio displays dynamic content from the database instead of mock data.

#### Acceptance Criteria

1. `GET /api/projects` endpoint returns list of all projects with related technologies, roles, links, images
2. `GET /api/projects/{slug}` endpoint returns single project by slug with full details
3. Response schemas defined using Pydantic models matching frontend TypeScript interfaces
4. `GET /api/projects` returns 200 OK with array of project objects
5. `GET /api/projects/{slug}` returns 200 OK for existing project
6. `GET /api/projects/{slug}` returns 404 Not Found for non-existent slug
7. Responses include properly serialized nested data (technologies, roles, links, images)
8. API responses match the data structure expected by frontend components
9. pytest integration tests cover both endpoints with various scenarios (success, 404, empty database)
10. OpenAPI documentation auto-generated and accessible at `/docs`

### Story 2.4: Frontend API Integration

**As a** portfolio visitor,
**I want** project data loaded from the real backend API,
**so that** the portfolio content can be updated without code changes.

#### Acceptance Criteria

1. API client service created for frontend with typed functions (getProjects(), getProjectBySlug())
2. Vite proxy configuration routes `/api/*` requests to FastAPI backend during development
3. Project grid fetches data from `GET /api/projects` on page load
4. Modal fetches detailed data from `GET /api/projects/{slug}` when opened (or uses cached list data)
5. Loading states displayed while API requests are in progress
6. Error states handled gracefully (show user-friendly message if API fails)
7. Mock data from Story 1.4 removed and replaced with API calls
8. TypeScript interfaces updated if needed to match API response schemas
9. Filtering system works correctly with API-sourced data
10. React Testing Library tests updated to mock API calls and verify integration

### Story 2.5: Resume Page with PDF Download

**As a** portfolio visitor,
**I want** a styled HTML resume page with PDF download option,
**so that** I can review qualifications online or download for offline review.

#### Acceptance Criteria

1. Resume page component created at `/resume` route
2. Resume content structured with semantic HTML (sections for experience, education, skills, etc.)
3. Resume styled to match portfolio design system (Tailwind + shadcn components)
4. Resume layout is clean, scannable, and professional
5. "Download PDF" button prominently displayed at top of page
6. PDF file stored in public/ directory and served statically
7. PDF download button triggers file download (not open in new tab)
8. Resume page is responsive (readable on mobile, optimized for desktop)
9. Resume content matches PDF content (no significant discrepancies)
10. Page is accessible with proper heading hierarchy and semantic structure

### Story 2.6: Contact Page

**As a** portfolio visitor,
**I want** a contact page with links to professional networks and email,
**so that** I can easily reach out through my preferred communication channel.

#### Acceptance Criteria

1. Contact page component created at `/contact` route
2. Page displays clear heading and brief contact invitation text
3. Contact links displayed for: X (Twitter), LinkedIn, Email
4. Each link includes appropriate icon and label
5. Email link uses `mailto:` protocol
6. Social links open in new tab with `rel="noopener noreferrer"`
7. Links are styled consistently with portfolio design (hover states, focus indicators)
8. Page layout is clean and focused on contact options
9. Page is responsive and accessible
10. Optional: Display brief "preferred contact method" guidance if applicable

---

## Epic 3: Production Deployment & Quality Assurance

**Epic Goal:** Deploy the portfolio to production VPS with proper infrastructure configuration, implement comprehensive E2E test coverage using Playwright, and apply final accessibility and visual polish to deliver a production-ready, professional portfolio site.

**Value Delivered:** At the end of this epic, the portfolio is live on the internet with proper infrastructure, thoroughly tested with E2E coverage, accessible to all users, and polished to professional standards. The site is ready to share with hiring managers and recruiters.

### Story 3.1: Production Build Configuration

**As a** developer,
**I want** optimized production builds for both frontend and backend,
**so that** the deployed site is performant and properly configured for production use.

#### Acceptance Criteria

1. Frontend production build configured with Vite (minification, code splitting, asset optimization)
2. Environment variable handling configured for frontend (production API base URL)
3. Backend production configuration created (proper logging, error handling, security headers)
4. SQLite database file location configured for production (persistent storage path)
5. Production build script creates optimized static assets
6. Build output size is reasonable (frontend bundle < 500KB gzipped as baseline target)
7. Source maps configured appropriately (excluded from production or restricted)
8. Production build runs successfully locally for testing
9. Build documentation added to deployment guide

### Story 3.2: VPS Deployment & Nginx Configuration

**As a** developer,
**I want** the portfolio deployed to VPS with Nginx reverse proxy,
**so that** the site is publicly accessible with proper routing and performance.

#### Acceptance Criteria

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

### Story 3.3: Playwright E2E Test Suite - Core Flows

**As a** developer,
**I want** comprehensive E2E tests covering critical user journeys,
**so that** regressions are caught before deployment and core functionality is verified.

#### Acceptance Criteria

1. Playwright installed and configured for E2E testing
2. Test: Homepage loads and displays project grid with all 7 projects
3. Test: Project cards display correct data (title, roles, technologies)
4. Test: Clicking project card opens modal with correct project details
5. Test: Modal displays full description, links, and conditionally shows/hides media section
6. Test: Modal closes on Escape key press
7. Test: Modal closes on backdrop click
8. Test: Focus returns to correct card after modal close
9. Test: Navigation between routes (/, /resume, /contact) works correctly
10. Test: Active route is visually indicated in navigation
11. Playwright MCP integration available for enhanced debugging and snapshot capabilities
12. All E2E tests pass consistently on local development environment

### Story 3.4: Playwright E2E Test Suite - Filtering & Interactions

**As a** developer,
**I want** E2E tests for filtering and interactive features,
**so that** dynamic functionality is thoroughly validated.

#### Acceptance Criteria

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
11. Test: Contact page displays all contact links with correct hrefs
12. All filtering E2E tests pass consistently

### Story 3.5: Accessibility Audit & Improvements

**As a** portfolio visitor with accessibility needs,
**I want** the site to meet WCAG 2.1 AA standards,
**so that** I can fully experience and navigate the portfolio regardless of abilities.

#### Acceptance Criteria

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

### Story 3.6: Visual Polish & Performance Optimization

**As a** portfolio visitor,
**I want** a polished, fast-loading site with smooth interactions,
**so that** my first impression is positive and the site reflects professional quality.

#### Acceptance Criteria

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
