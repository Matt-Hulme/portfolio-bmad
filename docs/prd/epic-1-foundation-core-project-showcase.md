# Epic 1: Foundation & Core Project Showcase

**Epic Goal:** Establish a solid technical foundation with modern tooling, responsive design system, and deliver the core portfolio value proposition—a fully functional project showcase featuring filterable project cards and modal-based detail views. This epic delivers a deployable portfolio that demonstrates technical capability even without backend API integration.

**Value Delivered:** At the end of this epic, you have a working portfolio site that can be demoed to hiring managers, showcasing your projects with professional presentation and smooth interactions. The site is responsive, accessible, and demonstrates technical polish.

## Story 1.1: Project Foundation & Tooling Setup

**As a** developer,
**I want** a properly configured React + TypeScript + Vite project with Tailwind and shadcn/ui,
**so that** I have a solid foundation for building the portfolio with modern tooling and type safety.

### Acceptance Criteria

1. Vite project initialized with React 19.1.1 and TypeScript 5.8+ template
2. TailwindCSS 4.1.13 installed and configured with basic configuration
3. shadcn/ui 3.0+ CLI installed and initialized with default configuration
4. ESLint and Prettier configured for code quality and formatting
5. Basic folder structure created (src/components, src/pages, src/lib, src/types)
6. Vite dev server runs successfully with "Hello World" placeholder
7. TypeScript compilation succeeds with no errors
8. Unit test setup complete with Vitest and basic smoke test passes

## Story 1.2: Design System Foundation

**As a** developer,
**I want** Tailwind design tokens configured and core shadcn/ui components installed,
**so that** the application has a consistent, professional design system to build upon.

### Acceptance Criteria

1. Tailwind config extended with custom color palette, spacing scale, and typography tokens
2. shadcn/ui components installed: Button, Card, Badge, Dialog
3. Global CSS configured with Tailwind base styles and custom CSS variables
4. Responsive breakpoint strategy documented (mobile-first approach)
5. Basic layout container component created with max-width and padding
6. Typography styles established (headings, body, links)
7. Component showcase page created demonstrating installed shadcn components
8. Design system is visually cohesive across different viewport sizes

## Story 1.3: Application Shell & Navigation

**As a** portfolio visitor,
**I want** clear navigation and proper routing between pages,
**so that** I can easily explore different sections of the portfolio.

### Acceptance Criteria

1. React Router installed and configured with route definitions for `/`, `/resume`, `/contact`
2. Navigation component created with links to all main pages
3. Navigation is responsive (mobile: hamburger or simplified; desktop: full horizontal nav)
4. Active route is visually indicated in navigation
5. Page layout component wraps all routes with consistent header/footer structure
6. Smooth transitions between routes (no flash of unstyled content)
7. 404 page created for invalid routes
8. Keyboard navigation works (Tab through nav links, Enter to activate)

## Story 1.4: Project Data Model & Mock Data

**As a** developer,
**I want** TypeScript interfaces for project data and comprehensive mock data,
**so that** I can develop the UI with realistic content before backend integration.

### Acceptance Criteria

1. TypeScript interfaces defined for Project, Technology, Role, Industry types
2. Mock data file created with 7 complete project entries
3. Each project includes: title, slug, summary, description, roles[], technologies[], industry, links (optional), images[] (optional)
4. Mock data includes variety of: frontend projects, backend projects, AI/ML projects, data projects, product projects, marketing projects
5. At least 2 projects have "alive" links, at least 3 have images, at least 2 have neither
6. Data structure supports filtering by technology and role
7. TypeScript types are exported and reusable across components
8. Mock data helper functions created (e.g., getAllProjects(), getProjectBySlug())

## Story 1.5: Project Grid Display

**As a** portfolio visitor,
**I want** to see all projects displayed in an attractive, scannable grid,
**so that** I can quickly browse the portfolio and identify projects of interest.

### Acceptance Criteria

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

## Story 1.6: Project Filtering System

**As a** portfolio visitor,
**I want** to filter projects by technology or role,
**so that** I can quickly find projects relevant to my interests or hiring needs.

### Acceptance Criteria

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

## Story 1.7: Project Detail Modal

**As a** portfolio visitor,
**I want** to view full project details in a focused modal overlay,
**so that** I can learn more about a project without losing my place in the grid.

### Acceptance Criteria

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
