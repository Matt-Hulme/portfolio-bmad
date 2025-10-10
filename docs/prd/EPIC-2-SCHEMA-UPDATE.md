# Epic 2: Schema Update Summary

**Date:** 2025-10-10
**Status:** Stories 2.2-2.7 Updated

## Schema Changes from Original Plan

### Data Source
- **Original:** Mock TypeScript data from `frontend/src/data/projects.ts`
- **Updated:** CSV file at `frontend/src/data/projects-data/projects-standardized.csv`

### Removed Fields/Tables

#### Project Model
- ❌ **Removed:** `industry` field (not in CSV)

#### ProjectLink Table
- ❌ **Removed:** Entire `ProjectLink` table with its flexible type system
- ✅ **Replaced with:** Two simple fields on Project model:
  - `live_url` (String, nullable)
  - `github_url` (String, nullable)

### Updated Schema

```python
# Project Model (simplified)
class Project(Base):
    id: String (PK)
    title: String
    slug: String (unique)
    summary: Text
    description: Text  # Markdown with embedded tech stack
    live_url: String (nullable)      # ← NEW: replaces ProjectLink
    github_url: String (nullable)    # ← NEW: replaces ProjectLink
    created_at: DateTime
    updated_at: DateTime

    # Relationships (unchanged)
    technologies: Many-to-Many
    roles: Many-to-Many
    images: One-to-Many

# Technology Model (unchanged)
class Technology(Base):
    id: String (PK)
    name: String (unique)

# Role Model (unchanged)
class Role(Base):
    id: String (PK)
    name: String (unique)

# ProjectImage Model (unchanged)
class ProjectImage(Base):
    id: String (PK)
    project_id: String (FK)
    url: String  # e.g., /images/projects/sw-v2/home.png
    alt_text: String
    order_num: Integer
```

### CSV Data Structure

**Columns:**
1. Project Title
2. Project Slug
3. Summary
4. Full Description (markdown with Tech Stack sections)
5. Role(s) (comma/semicolon-separated: e.g., "Frontend Dev; AI Engineer")
6. Live Site URL (or "None")
7. GH Repo (or "None")

**Total Projects:** 13 (not 7 as originally planned)

### Data Extraction Requirements

#### 1. Technologies
Extract from markdown "Tech Stack" sections in Full Description:
```markdown
### Tech Stack
- **Frontend:** TypeScript, React, TailwindCSS, Vite
- **Backend:** FastAPI, Python, SQLAlchemy, SQLite
```
Use regex to parse comma-separated values, deduplicate, create Technology records.

#### 2. Roles
Parse from "Role(s)" CSV column:
- `"Frontend Dev"` → single role
- `"Fullstack Dev; AI Engineer"` → split on semicolon
- `"AI Engineer; Product Manager; Data Engineer; Marketer"` → multiple roles

Split, trim, deduplicate, create Role records.

#### 3. URLs
- CSV "None" string → Python None/SQL NULL
- Valid URLs stored as-is in `live_url` or `github_url`

#### 4. Images/Videos
Map existing files from `frontend/src/data/projects-data/`:
- 26 PNG files (various projects)
- 1 MOV file (`Brainstormer Demo.mov`)

Database should reference **backend static URLs**:
- `/images/projects/{slug}/filename.png`
- `/videos/projects/{slug}/filename.mov`

**Note:** Actual file organization happens in Story 2.7, but database URLs reference final location.

### API Response Format

```json
{
  "id": "uuid",
  "title": "Project Title",
  "slug": "project-slug",
  "summary": "Brief summary",
  "description": "# Full markdown description with tech stack",
  "liveUrl": "https://example.com",  // or null
  "githubUrl": "https://github.com/user/repo",  // or null
  "roles": [{"id": "uuid", "name": "Frontend Dev"}],
  "technologies": [{"id": "uuid", "name": "React"}],
  "images": [{
    "id": "uuid",
    "projectId": "uuid",
    "url": "/images/projects/project-slug/home.png",
    "altText": "Screenshot",
    "order": 0
  }],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

**Key Changes:**
- No `industry` field
- No `links` array
- Instead: `liveUrl` and `githubUrl` (both nullable)

### Story Updates

All Epic 2 stories have been updated to reflect this schema:
- ✅ Story 2.2: Database Models & SQLAlchemy Setup
- ✅ Story 2.3: Projects API Endpoints
- ⏳ Story 2.4: Frontend API Integration (to be updated)
- ⏳ Story 2.5: Resume Page (no changes needed)
- ⏳ Story 2.6: Contact Page (no changes needed)
- ⏳ Story 2.7: Media Assets & Static File Serving (to be updated)

### Next Steps

1. Complete Story 2.1 (FastAPI setup) - ✅ DONE
2. Implement Story 2.2 with updated schema
3. Parse CSV data correctly in seed script
4. Extract technologies from markdown
5. Parse roles from CSV column
6. Handle "None" → NULL conversion
7. Create ProjectImage records with backend static URLs
8. Update architecture.md with final schema (do this when committing Story 2.1 or 2.2)
