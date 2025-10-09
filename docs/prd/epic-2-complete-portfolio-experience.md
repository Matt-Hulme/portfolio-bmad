# Epic 2: Complete Portfolio Experience

**Epic Goal:** Transform the frontend showcase into a complete, data-driven portfolio by integrating a FastAPI backend for project data management, and adding resume and contact pages to deliver all essential portfolio functionality. This epic completes the feature set, making the portfolio fully functional and content-complete.

**Value Delivered:** At the end of this epic, the portfolio has all planned features working together: dynamic project data from a real API, professional resume presentation with PDF download, and clear contact pathways. The site is feature-complete and ready for comprehensive testing and deployment.

## Story 2.1: FastAPI Project Setup & Basic Server

**As a** developer,
**I want** a properly configured FastAPI backend with project structure and development server,
**so that** I have a foundation for building REST API endpoints.

### Acceptance Criteria

1. FastAPI 0.115.5 project initialized in backend/ directory (or similar structure within monorepo)
2. Python 3.13.7 virtual environment configured with dependencies (FastAPI, SQLAlchemy 2.0.36, pytest, pytest-asyncio)
3. Basic FastAPI app created with health check endpoint (`GET /api/health`)
4. Ruff and Black configured for Python linting and formatting
5. Basic folder structure created (app/routers, app/models, app/schemas, tests/)
6. CORS middleware configured to allow frontend development server origin
7. Backend dev server runs successfully and health check returns 200 OK
8. pytest setup complete with basic health check test passing
9. README or docs include instructions for running backend server

## Story 2.2: Database Models & SQLAlchemy Setup

**As a** developer,
**I want** SQLAlchemy models for projects and related data with SQLite database,
**so that** I can persist and query project data for the API.

### Acceptance Criteria

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

## Story 2.3: Projects API Endpoints

**As a** frontend developer,
**I want** REST API endpoints to retrieve project data,
**so that** the portfolio displays dynamic content from the database instead of mock data.

### Acceptance Criteria

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

## Story 2.4: Frontend API Integration

**As a** portfolio visitor,
**I want** project data loaded from the real backend API,
**so that** the portfolio content can be updated without code changes.

### Acceptance Criteria

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

## Story 2.5: Resume Page with PDF Download

**As a** portfolio visitor,
**I want** a styled HTML resume page with PDF download option,
**so that** I can review qualifications online or download for offline review.

### Acceptance Criteria

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

## Story 2.6: Contact Page

**As a** portfolio visitor,
**I want** a contact page with links to professional networks and email,
**so that** I can easily reach out through my preferred communication channel.

### Acceptance Criteria

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
