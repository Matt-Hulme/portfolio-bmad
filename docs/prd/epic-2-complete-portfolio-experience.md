# Epic 2: Complete Portfolio Experience

**Epic Goal:** Transform the frontend showcase into a complete, data-driven portfolio by integrating a FastAPI backend for project data management, and adding resume and contact pages to deliver all essential portfolio functionality. This epic completes the feature set, making the portfolio fully functional and content-complete.

**Value Delivered:** At the end of this epic, the portfolio has all planned features working together: dynamic project data from a real API, professional resume presentation with PDF download, and clear contact pathways. The site is feature-complete and ready for comprehensive testing and deployment.

## Story 2.1: FastAPI Project Setup & Basic Server

**As a** developer,
**I want** a properly configured FastAPI backend with project structure and development server,
**so that** I have a foundation for building REST API endpoints.

### Acceptance Criteria

1. FastAPI 0.115.5 project initialized in backend/ directory (or similar structure within monorepo)
2. Python 3.13.7 virtual environment configured with `uv` (10-100x faster than pip)
3. Dependencies installed via uv: FastAPI, Uvicorn, SQLAlchemy 2.0.36, pytest, pytest-asyncio, Ruff, Black
4. Basic FastAPI app created with health check endpoint (`GET /api/health`)
5. Ruff and Black configured for Python linting and formatting
6. Basic folder structure created (app/routers, app/models, app/schemas, tests/)
7. CORS middleware configured to allow frontend development server origin
8. Backend dev server runs successfully and health check returns 200 OK
9. pytest setup complete with basic health check test passing
10. README or docs include instructions for running backend server with uv

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
5. Enhanced loading states displayed while API requests are in progress:
   - Progress bar that fills (not simple spinner)
   - Skeleton screens for content loading
   - Smooth transitions between loading and loaded states
   - Loading indicators appropriate for each context (grid vs modal)
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

## Story 2.7: Media Assets & Static File Serving

**As a** developer,
**I want** a proper media storage strategy for project images and video,
**so that** portfolio projects display rich visual content efficiently.

### Acceptance Criteria

#### Media Organization
1. Project media assets organized in `backend/static/images/projects/{project-slug}/` directory structure
2. Each project has dedicated subdirectory for its media files
3. File naming convention documented (e.g., `{project-slug}-{descriptor}.{ext}`)
4. Images optimized for web delivery (compressed, appropriate formats)
5. Video files converted to web-friendly formats (MP4/WebM with H.264/VP9 codecs)

#### Image Optimization
1. Large PNG images (>1MB) compressed or converted to WebP format
2. Images resized to appropriate dimensions (max 1920px width for full-screen)
3. Multiple sizes generated for responsive images where needed (optional for MVP)
4. Image file sizes reasonable (<500KB for most images, <1MB for hero images)
5. Optimization script or documentation provided for future image additions

#### Video Handling
1. MOV files converted to MP4 format with H.264 codec for broad compatibility
2. Video file sizes optimized (target <5MB for short demos)
3. Video poster images (thumbnails) extracted and saved
4. Optional: WebM format generated as fallback for modern browsers
5. Video playback tested across browsers (Chrome, Firefox, Safari)

#### Backend Static File Serving
1. FastAPI configured to serve static files from `backend/static/` directory
2. Static file endpoint configured (e.g., `/images/projects/{path}`)
3. Nginx configuration documented for production static file serving (direct serving, bypassing FastAPI)
4. CORS headers configured for static assets if needed
5. Cache headers set appropriately for static assets (long-term caching)

#### Database Image References
1. ProjectImage model URLs reference static file paths (e.g., `/images/projects/star-wars-v2/home.png`)
2. Seed data script updated with correct image URLs for all real projects
3. Image alt text and captions populated for accessibility
4. Images ordered correctly (order_num field) for gallery display
5. Database includes poster image references for video content

#### Frontend Integration
1. ProjectDetailModal updated to handle video content (HTML5 `<video>` element)
2. Video player includes controls, poster image, and fallback message
3. Gallery component supports mixed media (images + video)
4. Lazy loading implemented for images in modal gallery
5. Responsive image handling (srcset/picture element for key images - optional)

#### Testing & Validation
1. All project images load correctly in modal galleries
2. Video playback works in modal (autoplay muted, or user-initiated)
3. Static file serving performance tested (response times <100ms)
4. Broken image handling implemented (fallback placeholder or message)
5. Media assets work correctly in both development (Vite proxy) and production (Nginx)

#### Documentation
1. Media asset organization documented in architecture.md
2. Image optimization workflow documented (tools, settings)
3. Video conversion instructions documented (ffmpeg commands or tools)
4. Deployment checklist includes media asset deployment steps
5. Future media addition process documented

### Technical Notes

**Backend Static Serving (Development):**
```python
# app/main.py
from fastapi.staticfiles import StaticFiles

app.mount("/images", StaticFiles(directory="static/images"), name="images")
```

**Nginx Production Config:**
```nginx
location /images/ {
    alias /var/www/portfolio/backend/static/images/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Video Optimization (ffmpeg example):**
```bash
# Convert MOV to MP4 with H.264
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# Extract poster frame
ffmpeg -i input.mov -ss 00:00:01 -vframes 1 output-poster.jpg
```

**Image Optimization (example tools):**
- ImageOptim, TinyPNG, Squoosh for compression
- Sharp (Node.js), Pillow (Python) for automated optimization
- WebP conversion for modern browsers

---
