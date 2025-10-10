# Story 2.2: Database Models & SQLAlchemy Setup

**Status:** Pending

**As a** developer,
**I want** SQLAlchemy models for projects and related data with SQLite database,
**so that** I can persist and query project data for the API.

## Acceptance Criteria

- [ ] SQLAlchemy base configuration created with SQLite database connection
- [ ] Project model created with fields: id, title, slug, summary, description, live_url, github_url, created_at, updated_at
- [ ] Technology model created with many-to-many relationship to Project
- [ ] Role model created with many-to-many relationship to Project
- [ ] ProjectImage model created for storing image references (url, alt_text, order_num)
- [ ] Database initialization script creates tables
- [ ] Seed data script populates database with project data from projects-standardized.csv
- [ ] Seed script extracts technologies from markdown "Tech Stack" sections
- [ ] Seed script parses roles from comma-separated Role(s) column
- [ ] Seed script maps image files from projects-data/ directory to ProjectImage records
- [ ] SQLAlchemy queries tested with pytest fixtures using temporary test database
- [ ] Database schema supports all data fields from CSV

## Task Breakdown

### 1. Database Configuration
- [ ] Create app/database.py
- [ ] Configure SQLite connection string (sqlite:///./portfolio.db)
- [ ] Create SQLAlchemy engine with check_same_thread=False
- [ ] Create SessionLocal sessionmaker
- [ ] Create declarative Base
- [ ] Implement get_db() dependency function
- [ ] Implement init_db() function to create tables

### 2. Junction Tables
- [ ] Define project_technologies junction table
- [ ] Define project_roles junction table
- [ ] Configure foreign keys with CASCADE delete
- [ ] Add composite primary keys (project_id, technology_id/role_id)

### 3. Project Model
- [ ] Create app/models/project.py
- [ ] Define Project class inheriting from Base
- [ ] Add id (String, primary_key)
- [ ] Add title (String, nullable=False)
- [ ] Add slug (String, unique=True, indexed)
- [ ] Add summary (Text, nullable=False)
- [ ] Add description (Text, nullable=False, markdown content)
- [ ] Add live_url (String, nullable=True)
- [ ] Add github_url (String, nullable=True)
- [ ] Add created_at (DateTime with server_default)
- [ ] Add updated_at (DateTime with server_default and onupdate)
- [ ] Define relationships: technologies, roles, images

### 4. Technology Model
- [ ] Define Technology class
- [ ] Add id (String, primary_key)
- [ ] Add name (String, unique=True, indexed)
- [ ] Define back_populates relationship to projects

### 5. Role Model
- [ ] Define Role class
- [ ] Add id (String, primary_key)
- [ ] Add name (String, unique=True, indexed)
- [ ] Define back_populates relationship to projects

### 6. ProjectImage Model
- [ ] Define ProjectImage class
- [ ] Add id (String, primary_key)
- [ ] Add project_id (String, ForeignKey with CASCADE)
- [ ] Add url (String, nullable=False)
- [ ] Add alt_text (String, nullable=False)
- [ ] Add order_num (Integer, default=0)
- [ ] Define relationship to project with order_by

### 7. Database Initialization Script
- [ ] Create scripts/init_db.py
- [ ] Import Base and all models
- [ ] Call init_db() to create all tables
- [ ] Add success/error logging
- [ ] Make script executable

### 8. Seed Data Script
- [ ] Create scripts/seed_db.py
- [ ] Import csv module to read projects-standardized.csv
- [ ] Parse CSV and iterate through each row
- [ ] Extract technologies from "Tech Stack" markdown sections using regex
- [ ] Parse roles from comma-separated "Role(s)" column
- [ ] Handle "None" values for live_url and github_url
- [ ] Create Technology instances for all unique technologies extracted
- [ ] Create Role instances for all unique roles parsed
- [ ] Create Project instances with live_url and github_url fields
- [ ] Map image files from frontend/src/data/projects-data/ directory
- [ ] Create ProjectImage instances with backend static URLs (e.g., /images/projects/{slug}/home.png)
- [ ] Handle MOV video file (brainstormer) as ProjectImage with video URL
- [ ] Use UUIDs for all id fields
- [ ] Handle transaction rollback on errors
- [ ] Add progress logging for each project seeded

### 9. Test Database Fixtures
- [ ] Create tests/conftest.py
- [ ] Create test_db fixture using in-memory SQLite
- [ ] Create test_session fixture
- [ ] Create sample_project fixture
- [ ] Create sample_technology fixture
- [ ] Create sample_role fixture

### 10. Model Tests
- [ ] Create tests/test_models.py
- [ ] Test Project model creation
- [ ] Test many-to-many relationships (technologies, roles)
- [ ] Test one-to-many relationships (links, images)
- [ ] Test cascade deletes
- [ ] Test unique constraints (slug, technology name, role name)
- [ ] Test timestamps (created_at, updated_at)
- [ ] Test query filtering by slug

### 11. Verification
- [ ] Run init_db.py script successfully
- [ ] Verify portfolio.db file created
- [ ] Run seed_db.py script successfully
- [ ] Verify 13 projects inserted (from CSV)
- [ ] Query database to confirm data structure
- [ ] Verify technologies extracted correctly from markdown
- [ ] Verify roles parsed correctly from CSV
- [ ] Verify live_url and github_url populated (None converted to NULL)
- [ ] Verify ProjectImage records created for existing PNG/MOV files
- [ ] Run pytest and confirm all model tests pass
- [ ] Check database file size is reasonable (<1MB)

## Files to Create

- `/backend/app/database.py` - Database configuration
- `/backend/app/models/project.py` - All SQLAlchemy models
- `/backend/scripts/init_db.py` - Table creation script
- `/backend/scripts/seed_db.py` - Data seeding script
- `/backend/tests/conftest.py` - pytest fixtures
- `/backend/tests/test_models.py` - Model unit tests

## Dependencies

- Story 2.1 must be complete (FastAPI setup)
- frontend/src/data/projects-data/projects-standardized.csv (source data)
- frontend/src/data/projects-data/*.png (image files to map)
- frontend/src/data/projects-data/*.mov (video file to map)

## Technical Notes

### Technology Extraction
Extract technologies from markdown sections like:
```markdown
### Tech Stack
- **Frontend:** TypeScript, React, TailwindCSS, Vite
- **Backend:** FastAPI, Python, SQLAlchemy, SQLite
```

Use regex to capture comma-separated values after colons, clean and deduplicate.

### Role Parsing
Parse roles from CSV column like: `"Frontend Dev"`, `"Fullstack Dev; AI Engineer"`, `"AI Engineer; Product Manager; Data Engineer; Marketer"`

Split on semicolon, trim whitespace, create unique Role entries.

### Image Mapping
Map PNG files to projects by slug:
- `sw-v2-Home.png` → project slug `star-wars-archive-2` → `/images/projects/star-wars-archive-2/home.png`
- `Brainstormer Demo.mov` → project slug `brainstormer` → `/videos/projects/brainstormer/demo.mov`

**Note:** Images/videos will be organized in Story 2.7, but database should reference final backend URLs.

### General Notes
- Use UUIDs (uuid.uuid4()) for all primary keys
- SQLite datetime stored as TEXT with ISO 8601 format
- Eager loading with joinedload() to prevent N+1 queries
- Image order_num allows gallery sorting (ascending)
- Slug must be unique and URL-safe (use CSV "Project Slug" column as-is)
- Convert CSV "None" strings to Python None/NULL
