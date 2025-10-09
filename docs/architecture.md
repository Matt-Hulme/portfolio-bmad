# Portfolio Site v2 - Architecture Document

**Project:** Portfolio Site v2
**Domain:** matt-hulme.com
**Version:** 1.0.0
**Last Updated:** 2025-01-08
**Status:** Architecture Phase Complete

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Data Models](#4-data-models)
5. [API Specification](#5-api-specification)
6. [Component Architecture](#6-component-architecture)
7. [Core Workflows](#7-core-workflows)
8. [Database Schema](#8-database-schema)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Backend Architecture](#10-backend-architecture)
11. [Unified Project Structure](#11-unified-project-structure)
12. [Development Workflow](#12-development-workflow)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Security and Performance](#14-security-and-performance)
15. [Testing Strategy](#15-testing-strategy)
16. [Coding Standards](#16-coding-standards)
17. [Error Handling Strategy](#17-error-handling-strategy)
18. [Monitoring and Observability](#18-monitoring-and-observability)
19. [Architecture Checklist and Summary](#19-architecture-checklist-and-summary)

---

## 1. Introduction

### 1.1 Purpose

This document provides a comprehensive technical architecture for Portfolio Site v2, a greenfield portfolio website built with React and FastAPI. It serves as the primary reference for developers implementing the system.

### 1.2 Scope

This architecture covers:
- Frontend application (React SPA)
- Backend API (FastAPI)
- Database design (SQLite)
- Deployment strategy (GoDaddy VPS)
- Testing approach
- Development workflow

### 1.3 Audience

- Software developers implementing the system
- Technical reviewers
- Future maintainers

### 1.4 Key Requirements Summary

From PRD:
- Display 7+ portfolio projects in a filterable grid
- Show project details in modal overlay
- Filter by technology and role (client-side)
- Provide resume page with PDF download
- Include contact page with social links
- "Hacker Minimalist" design aesthetic
- Mobile responsive
- Simple, read-only portfolio (no CMS, no user accounts)

---

## 2. High-Level Architecture

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Internet / Users                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS (443)
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Nginx Reverse Proxy + SSL                   │
│  - Static file serving (frontend build)                 │
│  - API proxy (/api/* → FastAPI)                         │
│  - SSL termination (Let's Encrypt)                      │
└──────────┬──────────────────────────────────────────────┘
           │
           ├──────────────────────┬──────────────────────┐
           │                      │                      │
           ▼                      ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐
│  Frontend SPA    │  │  FastAPI Backend │  │ Static      │
│  (React 19)      │  │  (Python 3.13)   │  │ Assets      │
│  - Vite build    │  │  - REST API      │  │ - resume.pdf│
│  - Static files  │  │  - Port 8000     │  │ - images/   │
└──────────────────┘  └────────┬─────────┘  └─────────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  SQLite Database │
                      │  (portfolio.db)  │
                      └──────────────────┘
```

### 2.2 Repository Structure

Simple monorepo with directory separation:

```
portfolio-bmad/
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # FastAPI application
│   ├── app/
│   ├── tests/
│   └── requirements.txt
├── docs/               # Documentation
│   ├── prd/
│   └── architecture.md
└── README.md
```

**Note:** No npm workspaces or complex monorepo tooling. Just two separate projects in one repo.

---

## 3. Tech Stack

### 3.1 Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| TypeScript | 5.8+ | Type safety |
| Vite | 7.1.4 | Build tool & dev server |
| TailwindCSS | 4.1.13 | Utility-first styling |
| shadcn/ui | 3.0+ | Component library |
| React Router | 6.x | Client-side routing |
| React Query | 5.x | Server state management |
| Vitest | 2.x | Unit & integration testing |
| Playwright | 1.x | E2E testing |
| ESLint | 9.x | Linting |
| Prettier | 3.x | Code formatting |

### 3.2 Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.13.7 | Language |
| FastAPI | 0.115.5 | Web framework |
| Uvicorn | 0.34.0 | ASGI server |
| SQLAlchemy | 2.0.36 | ORM |
| Pydantic | 2.x | Data validation |
| pytest | 8.x | Testing |
| pytest-asyncio | 0.25+ | Async testing |
| Ruff | 0.8+ | Linting |
| Black | 24.x | Code formatting |

### 3.3 Infrastructure

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Database | SQLite 3.x | Simple, file-based, sufficient for portfolio |
| Web Server | Nginx | Reverse proxy + static file serving |
| SSL | Let's Encrypt | Free, auto-renewing certificates |
| Hosting | GoDaddy VPS | Managed hosting, simple deployment |
| Monorepo Tool | None needed | Simple directory structure |
| State Management | React Query + props | No Context, avoid complexity |

---

## 4. Data Models

### 4.1 Core Entities

```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string; // Markdown
  industry?: string;
  roles: Role[];
  technologies: Technology[];
  links: ProjectLink[];
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

interface Technology {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

type LinkType = 'alive' | 'github' | 'case_study' | 'other';

interface ProjectLink {
  id: string;
  projectId: string;
  type: LinkType;
  url: string;
  label: string;
}

interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  altText: string;
  order: number;
}
```

### 4.2 Relationships

- **Project ←→ Technology:** Many-to-many (junction table)
- **Project ←→ Role:** Many-to-many (junction table)
- **Project → ProjectLink:** One-to-many (cascade delete)
- **Project → ProjectImage:** One-to-many (cascade delete)

---

## 5. API Specification

### 5.1 Base URL

- **Development:** `http://localhost:8000/api`
- **Production:** `https://matt-hulme.com/api`

### 5.2 Endpoints

#### GET /api/health

Health check endpoint.

**Response (200 OK):**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

#### GET /api/projects

Get all projects with related data.

**Response (200 OK):**
```json
[
  {
    "id": "uuid",
    "title": "Project Title",
    "slug": "project-slug",
    "summary": "Brief summary",
    "description": "# Full description\n\nMarkdown content...",
    "industry": "Technology",
    "roles": [
      { "id": "uuid", "name": "Frontend Developer" }
    ],
    "technologies": [
      { "id": "uuid", "name": "React" },
      { "id": "uuid", "name": "TypeScript" }
    ],
    "links": [
      {
        "id": "uuid",
        "projectId": "uuid",
        "type": "alive",
        "url": "https://example.com",
        "label": "View Live Site"
      }
    ],
    "images": [
      {
        "id": "uuid",
        "projectId": "uuid",
        "url": "/images/project-1.png",
        "altText": "Project screenshot",
        "order": 0
      }
    ],
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

#### GET /api/projects/{slug}

Get a single project by slug.

**Response (200 OK):**
```json
{
  "id": "uuid",
  "title": "Project Title",
  // ... same structure as above
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Project with slug 'invalid-slug' not found"
}
```

### 5.3 Design Decisions

- **No pagination:** Small dataset (<10 projects)
- **No filtering endpoints:** Client-side filtering
- **No mutations:** Read-only API (POST/PUT/DELETE not needed)
- **Eager loading:** All related data returned in one query

---

## 6. Component Architecture

### 6.1 Frontend Components

**Pages:**
- `HomePage` - Landing page with hero and CTA
- `ProjectsPage` - Main project showcase (grid + filters + modal)
- `ProjectDetailPage` - Full project page (if slug directly accessed)
- `ResumePage` - Resume with PDF download
- `ContactPage` - Contact links
- `NotFoundPage` - 404 error page

**Layout Components:**
- `Header` - Site header with navigation
- `Footer` - Site footer
- `Navigation` - Nav links (Projects, Resume, Contact)

**Project Components:**
- `ProjectGrid` - Grid of project cards with filtering logic
- `ProjectCard` - Individual project card display
- `ProjectModal` - Modal overlay for project details
- `FilterBar` - Technology and role filter controls
- `ProjectDetail` - Project detail content (for modal/page)

**Common Components:**
- `LoadingSpinner` - Loading indicator
- `ErrorMessage` - Error display with retry option
- `ErrorBoundary` - React error boundary

**shadcn/ui Components:**
- `Button` - Styled button component
- `Card` - Card container
- `Dialog` - Modal dialog
- `Input` - Form input (if needed)

### 6.2 Backend Components

**Routers:**
- `health.py` - Health check endpoint
- `projects.py` - Project endpoints

**Models:**
- `project.py` - SQLAlchemy models (Project, Technology, Role, ProjectLink, ProjectImage)

**Schemas:**
- `project.py` - Pydantic response schemas
- `health.py` - Health check schema

**Repositories:**
- `project_repository.py` - Database query logic

**Core:**
- `main.py` - FastAPI app initialization
- `config.py` - Configuration management
- `database.py` - Database connection and session
- `dependencies.py` - FastAPI dependencies (get_db)

---

## 7. Core Workflows

### 7.1 Visual Workflow Diagram

A comprehensive application flow diagram is available at:
`.playwright-mcp/workflows.html`

Open this file in a browser to see the interactive Mermaid flowchart showing:
- User navigation decisions (Projects/Resume/Contact)
- Project browsing and filtering flow
- Modal interactions
- Error handling (404 paths)
- Resume PDF download flow

The diagram uses the Hacker Minimalist color scheme:
- Green (#7fda89) for user interaction points
- Red for error states
- Blue for database operations

---

## 8. Database Schema

### 8.1 Database System

**SQLite 3.x** (development and production)

### 8.2 Entity Relationship Diagram

```
Project (1) ──< (N) ProjectTechnology (N) >── (1) Technology
Project (1) ──< (N) ProjectRole (N) >── (1) Role
Project (1) ──< (N) ProjectLink
Project (1) ──< (N) ProjectImage
```

### 8.3 Table Definitions

#### `projects` table

```sql
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,  -- Markdown content
    industry TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

#### `technologies` table

```sql
CREATE TABLE technologies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE INDEX idx_technologies_name ON technologies(name);
```

#### `roles` table

```sql
CREATE TABLE roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE INDEX idx_roles_name ON roles(name);
```

#### `project_technologies` (junction table)

```sql
CREATE TABLE project_technologies (
    project_id TEXT NOT NULL,
    technology_id TEXT NOT NULL,
    PRIMARY KEY (project_id, technology_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_technologies_project ON project_technologies(project_id);
CREATE INDEX idx_project_technologies_tech ON project_technologies(technology_id);
```

#### `project_roles` (junction table)

```sql
CREATE TABLE project_roles (
    project_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    PRIMARY KEY (project_id, role_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_roles_project ON project_roles(project_id);
CREATE INDEX idx_project_roles_role ON project_roles(role_id);
```

#### `project_links` table

```sql
CREATE TABLE project_links (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('alive', 'github', 'case_study', 'other')),
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_links_project ON project_links(project_id);
```

#### `project_images` table

```sql
CREATE TABLE project_images (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    order_num INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_images_project ON project_images(project_id);
CREATE INDEX idx_project_images_order ON project_images(project_id, order_num);
```

### 8.4 SQLAlchemy Model Mapping

**File:** `backend/app/models/project.py`

```python
from sqlalchemy import Column, String, Text, DateTime, Integer, Table, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Junction tables
project_technologies = Table(
    'project_technologies',
    Base.metadata,
    Column('project_id', String, ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True),
    Column('technology_id', String, ForeignKey('technologies.id', ondelete='CASCADE'), primary_key=True)
)

project_roles = Table(
    'project_roles',
    Base.metadata,
    Column('project_id', String, ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True),
    Column('role_id', String, ForeignKey('roles.id', ondelete='CASCADE'), primary_key=True)
)

class Project(Base):
    __tablename__ = 'projects'

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True, index=True)
    summary = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    industry = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    technologies = relationship('Technology', secondary=project_technologies, back_populates='projects')
    roles = relationship('Role', secondary=project_roles, back_populates='projects')
    links = relationship('ProjectLink', back_populates='project', cascade='all, delete-orphan')
    images = relationship('ProjectImage', back_populates='project', cascade='all, delete-orphan', order_by='ProjectImage.order_num')

class Technology(Base):
    __tablename__ = 'technologies'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False, unique=True, index=True)

    projects = relationship('Project', secondary=project_technologies, back_populates='technologies')

class Role(Base):
    __tablename__ = 'roles'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False, unique=True, index=True)

    projects = relationship('Project', secondary=project_roles, back_populates='roles')

class ProjectLink(Base):
    __tablename__ = 'project_links'

    id = Column(String, primary_key=True)
    project_id = Column(String, ForeignKey('projects.id', ondelete='CASCADE'), nullable=False, index=True)
    type = Column(String, nullable=False)
    url = Column(String, nullable=False)
    label = Column(String, nullable=False)

    __table_args__ = (
        CheckConstraint("type IN ('alive', 'github', 'case_study', 'other')", name='check_link_type'),
    )

    project = relationship('Project', back_populates='links')

class ProjectImage(Base):
    __tablename__ = 'project_images'

    id = Column(String, primary_key=True)
    project_id = Column(String, ForeignKey('projects.id', ondelete='CASCADE'), nullable=False, index=True)
    url = Column(String, nullable=False)
    alt_text = Column(String, nullable=False)
    order_num = Column(Integer, nullable=False, default=0)

    project = relationship('Project', back_populates='images')
```

### 8.5 Database Initialization

**File:** `backend/app/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./portfolio.db')

engine = create_engine(
    DATABASE_URL,
    connect_args={'check_same_thread': False} if 'sqlite' in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency for FastAPI routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)
```

### 8.6 Seed Data Script

**File:** `backend/scripts/seed_db.py`

```python
import uuid
from sqlalchemy.orm import Session
from app.database import SessionLocal, init_db
from app.models.project import Project, Technology, Role, ProjectLink, ProjectImage

def create_seed_data():
    """Populate database with initial project data"""
    init_db()
    db = SessionLocal()

    try:
        # Create technologies
        react = Technology(id=str(uuid.uuid4()), name='React')
        typescript = Technology(id=str(uuid.uuid4()), name='TypeScript')
        python = Technology(id=str(uuid.uuid4()), name='Python')
        # ... add more

        # Create roles
        frontend = Role(id=str(uuid.uuid4()), name='Frontend Developer')
        backend = Role(id=str(uuid.uuid4()), name='Backend Developer')
        # ... add more

        db.add_all([react, typescript, python, frontend, backend])
        db.commit()

        # Create sample project
        project = Project(
            id=str(uuid.uuid4()),
            title='Sample Project',
            slug='sample-project',
            summary='A brief project summary',
            description='# Project Description\n\nDetailed markdown content...',
            industry='Technology',
            technologies=[react, typescript],
            roles=[frontend]
        )

        # Add links
        project.links.append(ProjectLink(
            id=str(uuid.uuid4()),
            type='alive',
            url='https://example.com',
            label='View Live'
        ))

        # Add images
        project.images.append(ProjectImage(
            id=str(uuid.uuid4()),
            url='/images/sample-project-1.png',
            alt_text='Sample project screenshot',
            order_num=0
        ))

        db.add(project)
        db.commit()

        print('✅ Database seeded successfully')

    except Exception as e:
        db.rollback()
        print(f'❌ Error seeding database: {e}')
    finally:
        db.close()

if __name__ == '__main__':
    create_seed_data()
```

---

## 9. Frontend Architecture

### 9.1 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── projects/        # ProjectCard, ProjectGrid, etc.
│   │   ├── resume/          # Resume components
│   │   └── common/          # LoadingSpinner, ErrorMessage, etc.
│   ├── pages/               # Route-level components
│   ├── hooks/               # React Query hooks
│   ├── lib/                 # API client, utilities
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── resume.pdf
│   └── images/
├── tests/
├── e2e/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 9.2 Component Examples

#### ProjectsPage

```typescript
export function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      <FilterBar
        selectedTech={selectedTech}
        selectedRole={selectedRole}
        onTechChange={setSelectedTech}
        onRoleChange={setSelectedRole}
      />
      <ProjectGrid
        selectedTech={selectedTech}
        selectedRole={selectedRole}
        onProjectClick={setModalProject}
      />
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </>
  );
}
```

#### ProjectGrid with Filtering

```typescript
interface ProjectGridProps {
  selectedTech: string | null;
  selectedRole: string | null;
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ selectedTech, selectedRole, onProjectClick }: ProjectGridProps) {
  const { data: projects, isLoading, error } = useProjects();

  // Client-side filtering
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter(project => {
      const techMatch = !selectedTech ||
        project.technologies.some(t => t.name === selectedTech);
      const roleMatch = !selectedRole ||
        project.roles.some(r => r.name === selectedRole);
      return techMatch && roleMatch;
    });
  }, [projects, selectedTech, selectedRole]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}
```

### 9.3 State Management

**Server State:** React Query 5.x
- Manages API data fetching, caching, and synchronization
- Automatic background refetching
- Query invalidation patterns

**UI State:** Props + useState
- Modal open/close state
- Filter selections
- Form inputs
- No React Context - prefer props drilling for simplicity

**Example React Query Hook:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/api';
import type { Project } from '@/types/project';

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
}
```

### 9.4 API Client

**File:** `lib/api.ts`

```typescript
import type { Project } from '@/types/project';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>('/projects');
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return fetchApi<Project>(`/projects/${slug}`);
}
```

### 9.5 Routing

**React Router 6.x configuration in `App.tsx`:**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### 9.6 Build Configuration

**File:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
});
```

---

## 10. Backend Architecture

### 10.1 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization
│   ├── config.py               # Configuration management
│   ├── database.py             # Database connection and session
│   ├── dependencies.py         # FastAPI dependencies
│   ├── models/
│   │   └── project.py          # SQLAlchemy models
│   ├── schemas/
│   │   ├── project.py          # Pydantic response schemas
│   │   └── health.py           # Health check schema
│   ├── routers/
│   │   ├── health.py           # GET /api/health
│   │   └── projects.py         # GET /api/projects, /api/projects/:slug
│   └── repositories/
│       └── project_repository.py  # Database query logic
├── scripts/
│   ├── seed_db.py              # Database seeding script
│   └── init_db.py              # Database initialization
├── tests/
├── requirements.txt
├── pyproject.toml
└── .env.example
```

### 10.2 Application Entry Point

**File:** `app/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.routers import health, projects

app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(projects.router, prefix="/api", tags=["projects"])
```

### 10.3 Configuration Management

**File:** `app/config.py`

```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

### 10.4 Router Implementation

**File:** `app/routers/projects.py`

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.repositories.project_repository import ProjectRepository
from app.schemas.project import ProjectResponse, ProjectDetailResponse

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """Get all projects with related data"""
    repo = ProjectRepository(db)
    projects = repo.get_all_projects()
    return projects

@router.get("/projects/{slug}", response_model=ProjectDetailResponse)
async def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a single project by slug"""
    repo = ProjectRepository(db)
    project = repo.get_project_by_slug(slug)

    if not project:
        raise HTTPException(
            status_code=404,
            detail=f"Project with slug '{slug}' not found"
        )

    return project
```

### 10.5 Repository Pattern

**File:** `app/repositories/project_repository.py`

```python
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.models.project import Project

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_projects(self) -> List[Project]:
        """Fetch all projects with eager loading of relationships"""
        return (
            self.db.query(Project)
            .options(
                joinedload(Project.technologies),
                joinedload(Project.roles),
                joinedload(Project.links),
                joinedload(Project.images)
            )
            .order_by(Project.created_at.desc())
            .all()
        )

    def get_project_by_slug(self, slug: str) -> Optional[Project]:
        """Fetch a single project by slug with eager loading"""
        return (
            self.db.query(Project)
            .options(
                joinedload(Project.technologies),
                joinedload(Project.roles),
                joinedload(Project.links),
                joinedload(Project.images)
            )
            .filter(Project.slug == slug)
            .first()
        )
```

### 10.6 Pydantic Response Schemas

**File:** `app/schemas/project.py`

```python
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class TechnologySchema(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True

class RoleSchema(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True

class ProjectLinkSchema(BaseModel):
    id: str
    project_id: str = Field(alias="projectId")
    type: str
    url: str
    label: str

    class Config:
        from_attributes = True
        populate_by_name = True

class ProjectImageSchema(BaseModel):
    id: str
    project_id: str = Field(alias="projectId")
    url: str
    alt_text: str = Field(alias="altText")
    order: int = Field(alias="order_num")

    class Config:
        from_attributes = True
        populate_by_name = True

class ProjectResponse(BaseModel):
    id: str
    title: str
    slug: str
    summary: str
    description: str
    industry: Optional[str] = None
    roles: List[RoleSchema]
    technologies: List[TechnologySchema]
    links: List[ProjectLinkSchema]
    images: List[ProjectImageSchema]
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    class Config:
        from_attributes = True
        populate_by_name = True

# Alias for detail endpoint
ProjectDetailResponse = ProjectResponse
```

---

## 11. Unified Project Structure

### 11.1 Complete Monorepo Layout

```
portfolio-bmad/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── layout/                # Header, Footer, Navigation
│   │   │   ├── projects/              # ProjectCard, ProjectGrid, etc.
│   │   │   ├── resume/                # Resume components
│   │   │   └── common/                # LoadingSpinner, ErrorMessage
│   │   ├── pages/                     # Route-level components
│   │   ├── hooks/                     # React Query hooks
│   │   ├── lib/                       # API client, utilities
│   │   ├── types/                     # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   ├── resume.pdf
│   │   └── images/
│   ├── tests/                         # Unit & integration tests
│   ├── e2e/                           # Playwright E2E tests
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── models/
│   │   │   └── project.py
│   │   ├── schemas/
│   │   │   ├── project.py
│   │   │   └── health.py
│   │   ├── routers/
│   │   │   ├── health.py
│   │   │   └── projects.py
│   │   └── repositories/
│   │       └── project_repository.py
│   ├── scripts/
│   │   ├── seed_db.py
│   │   └── init_db.py
│   ├── tests/                         # pytest tests
│   ├── portfolio.db                   # SQLite database (gitignored)
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── pyproject.toml
│   └── .env.example
│
├── docs/
│   ├── prd/                           # Sharded PRD
│   │   ├── index.md
│   │   ├── goals-and-background-context.md
│   │   ├── requirements.md
│   │   └── ... (other sections)
│   └── architecture.md                # This document
│
├── .bmad-core/
│   ├── core-config.yaml
│   └── data/
│       └── technical-preferences.md
│
├── .playwright-mcp/
│   ├── design-option-c.png
│   └── workflows.html
│
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml
│       └── backend-ci.yml
│
├── .gitignore
├── README.md
└── LICENSE
```

### 11.2 Root-Level Files

**`.gitignore`:**
```
# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.env.local

# Backend
backend/__pycache__/
backend/*.pyc
backend/.pytest_cache/
backend/portfolio.db
backend/.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

### 11.3 Environment Configuration

**`frontend/.env.example`:**
```bash
VITE_API_URL=http://localhost:8000/api
```

**`backend/.env.example`:**
```bash
DATABASE_URL=sqlite:///./portfolio.db
CORS_ORIGINS=["http://localhost:5173"]
ENVIRONMENT=development
DEBUG=true
```

---

## 12. Development Workflow

### 12.1 Initial Setup

**1. Clone and Navigate:**
```bash
git clone <repository-url>
cd portfolio-bmad
```

**2. Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
python scripts/init_db.py
python scripts/seed_db.py
```

**3. Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
```

### 12.2 Running Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- API Docs: http://localhost:8000/api/docs

### 12.3 Development Commands

**Frontend:**
```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run lint             # Run ESLint
npm run format           # Format code
```

**Backend:**
```bash
uvicorn app.main:app --reload              # Start server
pytest                                      # Run tests
pytest --cov=app                           # With coverage
ruff check .                               # Lint
black .                                    # Format
python scripts/seed_db.py                  # Seed database
```

### 12.4 Git Workflow

**Commit Message Convention:**
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
```

**Examples:**
```
feat(projects): add technology filter to project grid
fix(api): correct 404 response format for invalid slug
docs(architecture): update testing strategy section
test(projects): add integration tests for ProjectsPage
chore(deps): update React to 19.1.1
```

---

## 13. Deployment Architecture

### 13.1 Infrastructure Overview

**Hosting:** GoDaddy managed VPS
**Domain:** matt-hulme.com
**SSL:** Let's Encrypt (auto-renewing)

**Architecture:**
```
Internet (443/HTTPS)
    ↓
[Nginx Reverse Proxy]
    ↓
    ├─→ Frontend (Static Files)
    ├─→ Backend API (/api/*)
    └─→ Static Assets (/images/*, /resume.pdf)
```

### 13.2 Nginx Configuration

**File:** `/etc/nginx/sites-available/portfolio`

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name matt-hulme.com www.matt-hulme.com;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name matt-hulme.com www.matt-hulme.com;

    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/matt-hulme.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matt-hulme.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # Frontend static files
    root /var/www/portfolio/frontend/dist;
    index index.html;

    # API proxy
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static assets
    location /images/ {
        alias /var/www/portfolio/frontend/dist/images/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Frontend SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
}
```

### 13.3 FastAPI Systemd Service

**File:** `/etc/systemd/system/portfolio-api.service`

```ini
[Unit]
Description=Portfolio FastAPI Application
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/portfolio/backend
Environment="PATH=/var/www/portfolio/backend/venv/bin"
Environment="DATABASE_URL=sqlite:////var/www/portfolio/portfolio.db"
Environment="CORS_ORIGINS=[\"https://matt-hulme.com\"]"
Environment="ENVIRONMENT=production"
Environment="DEBUG=false"
ExecStart=/var/www/portfolio/backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4
Restart=always

[Install]
WantedBy=multi-user.target
```

**Service Commands:**
```bash
sudo systemctl enable portfolio-api
sudo systemctl start portfolio-api
sudo systemctl status portfolio-api
sudo systemctl restart portfolio-api
```

### 13.4 Deployment Process

**Initial Server Setup:**
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install dependencies
sudo apt install nginx python3.13 python3.13-venv nodejs npm certbot python3-certbot-nginx -y

# 3. Create directory
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio
```

**Deploy Application:**
```bash
# 1. Clone repository
cd /var/www/portfolio
git clone <repository-url> .

# 2. Build frontend
cd frontend
npm install
npm run build

# 3. Setup backend
cd ../backend
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python scripts/seed_db.py

# 4. Configure Nginx
sudo cp /path/to/nginx/config /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. Setup SSL
sudo certbot --nginx -d matt-hulme.com

# 6. Setup systemd service
sudo cp /path/to/service/file /etc/systemd/system/portfolio-api.service
sudo systemctl daemon-reload
sudo systemctl enable portfolio-api
sudo systemctl start portfolio-api
```

### 13.5 Database Backup

**Daily Backup Cron:**
```bash
# Add to crontab: crontab -e
0 2 * * * /usr/bin/sqlite3 /var/www/portfolio/portfolio.db ".backup '/var/www/portfolio/backups/portfolio-$(date +\%Y\%m\%d).db'"
0 3 * * * find /var/www/portfolio/backups -name "portfolio-*.db" -mtime +7 -delete
```

---

## 14. Security and Performance

### 14.1 Security Measures

**Frontend:**
- HTTPS enforced via Nginx redirect
- HSTS header configured
- Content Security Policy headers
- No secrets in frontend code
- React's default XSS protection

**Backend:**
- CORS restricted to production domain
- SQLAlchemy prevents SQL injection
- Pydantic input validation
- SQLite file permissions: 644
- SSH key-based auth only
- UFW firewall configured

**Server:**
- SSL/TLS via Let's Encrypt
- Firewall: UFW (ports 22, 80, 443)
- Automatic security updates
- Application runs as www-data (not root)

### 14.2 Performance Optimizations

**Frontend:**
- Code splitting (vendor, query chunks)
- Lazy loading for route components
- React Query caching (5-minute stale time)
- Image optimization and lazy loading
- Gzip compression enabled

**Backend:**
- Database eager loading (prevents N+1 queries)
- Connection pooling
- 4 Uvicorn workers
- Response compression via Nginx

**Caching:**
- Static assets: 1 year cache
- API responses: 5 minutes (optional)
- Database queries cached by React Query

**Performance Targets:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- API response < 100ms

---

## 15. Testing Strategy

### 15.1 Testing Philosophy

**3-Tier Testing Approach:**
1. **Unit Tests** - Fast, isolated, test single units
2. **Integration Tests** - Test component/module interactions
3. **E2E Tests** - Test complete user flows

### 15.2 Frontend Testing

**Unit Tests (Vitest + React Testing Library):**
- Individual components with mocked dependencies
- User interactions
- Utility functions
- Custom hooks

**Integration Tests (Vitest + React Testing Library):**
- Page components with child components
- Component communication via props
- API integration with React Query
- State management across components

**E2E Tests (Playwright):**
- Critical user journeys
- Cross-page navigation
- Error scenarios
- Mobile responsive behavior

**Coverage Targets:**
- Unit tests: >80% coverage
- Integration tests: >60% coverage
- E2E: All critical user flows

### 15.3 Backend Testing

**Unit Tests (pytest):**
- Repository methods
- Utility functions
- Business logic

**Integration Tests (pytest):**
- Database queries with test DB
- ORM relationships
- Transaction handling

**API Tests (pytest + TestClient):**
- HTTP endpoints
- Status codes
- Response schemas
- Error handling

**Coverage Targets:**
- Unit tests: >80% coverage
- Integration tests: >70% coverage
- API tests: 100% endpoint coverage

---

## 16. Coding Standards

### 16.1 Frontend Standards

**TypeScript:**
- Explicit types (no implicit any)
- Prefer interfaces over types
- Type all function parameters and returns

**React:**
- Functional components only
- Hooks at top level
- Event handlers prefixed with `handle`
- Named exports (not default)

**Styling:**
- TailwindCSS utility classes
- Consistent class ordering (via prettier-plugin-tailwindcss)
- Use `cn()` for conditional classes

**Import Order:**
1. React imports
2. Third-party libraries
3. Internal modules (@ alias)
4. Relative imports
5. Styles

### 16.2 Backend Standards

**Python:**
- PEP 8 compliance
- snake_case for functions/variables
- PascalCase for classes
- Type hints on all functions

**FastAPI:**
- Explicit response models
- Dependency injection via Depends()
- Descriptive error messages

**SQLAlchemy:**
- Eager loading to prevent N+1
- Clear model relationships
- Type hints on models

### 16.3 Code Review Checklist

**General:**
- [ ] Follows style guide
- [ ] No console.log or print statements committed
- [ ] No commented-out code
- [ ] Descriptive variable names

**Testing:**
- [ ] Unit tests for new logic
- [ ] Integration tests for interactions
- [ ] All tests passing

---

## 17. Error Handling Strategy

### 17.1 Frontend Error Handling

**React Error Boundaries:**
- Top-level error boundary wraps entire app
- Catches rendering errors
- Shows friendly error message with reload option

**API Errors:**
- Custom `ApiError` class
- React Query error handling
- `ErrorMessage` component for user-facing errors
- Network error detection with retry option

**404 Handling:**
- `NotFoundPage` for invalid routes
- Project-specific 404 for invalid slugs
- Link back to valid pages

### 17.2 Backend Error Handling

**Global Exception Handlers:**
- Request validation errors (422)
- Database errors (500)
- Catch-all for unexpected errors

**Route-Level Handling:**
- Try/catch blocks in routes
- HTTPException for expected errors
- Logging for all exceptions

**Error Response Format:**
```json
{
  "detail": "Human-readable error message"
}
```

### 17.3 Logging

**Development:**
- Human-readable console output
- DEBUG level

**Production:**
- Structured logging (optional JSON)
- INFO level
- Error tracking via systemd journalctl

---

## 18. Monitoring and Observability (MVP)

### 18.1 Essential Monitoring

**Health Check Endpoint:**
```python
@router.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}
```

**GoDaddy Email Alerts:**
- Default monitoring provided by hosting
- Email notifications for downtime

### 18.2 Basic Logging

**Backend Logging:**
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
logger.info(f"Fetching project: {slug}")
```

**View Logs:**
```bash
# Backend logs
sudo journalctl -u portfolio-api -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### 18.3 MVP Monitoring Checklist

- [ ] `/api/health` endpoint works
- [ ] GoDaddy email alerts configured
- [ ] Can view logs via journalctl

---

## 19. Architecture Checklist and Summary

### 19.1 Pre-Development Checklist

**Design & Requirements:**
- [ ] PRD reviewed and approved
- [ ] Design mockup approved (Hacker Minimalist)
- [ ] Domain confirmed: matt-hulme.com
- [ ] Color palette defined

**Technical Decisions:**
- [ ] Repository structure agreed
- [ ] Database choice confirmed (SQLite)
- [ ] State management strategy clear
- [ ] Deployment target confirmed (GoDaddy VPS)

### 19.2 Architecture Summary

**Project Type:** Portfolio website (read-only, single user)

**Tech Stack:**
- Frontend: React 19, TypeScript 5.8+, Vite, TailwindCSS, React Query
- Backend: FastAPI, Python 3.13, SQLAlchemy
- Database: SQLite 3.x
- Hosting: GoDaddy VPS with Nginx
- Domain: matt-hulme.com

**Key Patterns:**
- Monorepo with simple directory structure
- RESTful API (3 endpoints)
- Repository pattern for data access
- Client-side filtering
- React Query for server state, props for UI state

**Core Features:**
1. Project showcase grid with filtering
2. Project details modal
3. Resume page with PDF download
4. Contact page
5. Error handling
6. Responsive design

**Testing:**
- Frontend: Unit + Integration + E2E
- Backend: Unit + Integration + API
- Coverage: >80% for unit tests

**Security:**
- HTTPS enforced
- CORS restricted
- No sensitive data
- SSH key auth only

**Performance:**
- Code splitting
- React Query caching
- Gzip compression
- Database eager loading

### 19.3 Success Criteria

✅ Site loads in <2 seconds
✅ All projects display correctly
✅ Filtering works without API calls
✅ Modal opens/closes smoothly
✅ PDF downloads correctly
✅ Mobile responsive
✅ API responds in <100ms
✅ Tests can run locally and in CI
✅ Deployment in <30 minutes

### 19.4 Next Steps

**After Architecture Phase:**
1. **Development Phase** - Implement PRD epics
2. **Testing Phase** - Write test suites
3. **Deployment Phase** - Deploy to GoDaddy VPS
4. **QA Phase** - Manual testing

---

**Architecture Phase Complete!** 🚀

Ready to proceed to Development Phase.
