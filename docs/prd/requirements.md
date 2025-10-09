# Requirements

## Functional Requirements

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

## Non-Functional Requirements

**NFR1:** Page load times must achieve sub-second performance for initial render

**NFR2:** The system must maintain responsive performance with optimized asset loading

**NFR3:** All interactive elements must meet WCAG 2.1 accessibility standards

**NFR4:** Modal interactions must include keyboard navigation (Escape to close) and proper focus management

**NFR6:** The system must maintain professional visual presentation consistent with portfolio positioning

**NFR7:** The system must be deployable to VPS with Nginx reverse proxy and systemd service configuration

---
