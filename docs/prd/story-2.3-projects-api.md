# Story 2.3: Projects API Endpoints

**Status:** Pending

**As a** frontend developer,
**I want** REST API endpoints to retrieve project data,
**so that** the portfolio displays dynamic content from the database instead of mock data.

## Acceptance Criteria

- [ ] `GET /api/projects` endpoint returns list of all projects with related technologies, roles, images
- [ ] `GET /api/projects/{slug}` endpoint returns single project by slug with full details
- [ ] Response schemas defined using Pydantic models matching frontend TypeScript interfaces
- [ ] `GET /api/projects` returns 200 OK with array of project objects
- [ ] `GET /api/projects/{slug}` returns 200 OK for existing project
- [ ] `GET /api/projects/{slug}` returns 404 Not Found for non-existent slug
- [ ] Responses include properly serialized nested data (technologies, roles, images)
- [ ] Response includes liveUrl and githubUrl fields (nullable)
- [ ] API responses match the data structure expected by frontend components
- [ ] pytest integration tests cover both endpoints with various scenarios (success, 404, empty database)
- [ ] OpenAPI documentation auto-generated and accessible at `/api/docs`

## Task Breakdown

### 1. Pydantic Response Schemas
- [ ] Create app/schemas/project.py
- [ ] Define TechnologySchema (id, name)
- [ ] Define RoleSchema (id, name)
- [ ] Define ProjectImageSchema (id, projectId, url, altText, order)
- [ ] Define ProjectResponse schema with all fields:
  - id, title, slug, summary, description
  - liveUrl (optional), githubUrl (optional)
  - technologies, roles, images arrays
  - createdAt, updatedAt timestamps
- [ ] Use Field(alias="...") for camelCase conversion
- [ ] Configure from_attributes=True for ORM compatibility
- [ ] Configure populate_by_name=True for flexible field names
- [ ] Create ProjectDetailResponse as alias of ProjectResponse

### 2. Repository Pattern
- [ ] Create app/repositories/project_repository.py
- [ ] Define ProjectRepository class
- [ ] Implement __init__(self, db: Session)
- [ ] Implement get_all_projects() with eager loading
- [ ] Implement get_project_by_slug(slug: str) with eager loading
- [ ] Use joinedload() for technologies, roles, images
- [ ] Order projects by created_at DESC
- [ ] Return Optional[Project] for single project queries

### 3. Projects Router
- [ ] Create app/routers/projects.py
- [ ] Create APIRouter instance
- [ ] Import ProjectRepository and schemas
- [ ] Import get_db dependency

### 4. GET /api/projects Endpoint
- [ ] Define async function get_projects()
- [ ] Inject db: Session = Depends(get_db)
- [ ] Set response_model=List[ProjectResponse]
- [ ] Create ProjectRepository(db) instance
- [ ] Call repo.get_all_projects()
- [ ] Return projects list
- [ ] Add docstring explaining endpoint

### 5. GET /api/projects/{slug} Endpoint
- [ ] Define async function get_project_by_slug(slug: str, db: Session)
- [ ] Set response_model=ProjectDetailResponse
- [ ] Create ProjectRepository(db) instance
- [ ] Call repo.get_project_by_slug(slug)
- [ ] Handle None result with HTTPException 404
- [ ] Return project if found
- [ ] Add docstring explaining endpoint

### 6. Error Handling
- [ ] Import HTTPException from fastapi
- [ ] Format 404 message: "Project with slug '{slug}' not found"
- [ ] Ensure proper error response format (FastAPI default)

### 7. Router Registration
- [ ] Update app/main.py
- [ ] Import projects router
- [ ] Register router with prefix="/api"
- [ ] Add tags=["projects"] for OpenAPI grouping

### 8. Integration Tests - GET /api/projects
- [ ] Create tests/test_projects_api.py
- [ ] Import TestClient from fastapi.testclient
- [ ] Create test_get_all_projects_empty() for empty database
- [ ] Create test_get_all_projects_with_data() with seeded projects
- [ ] Verify 200 status code
- [ ] Verify response is array
- [ ] Verify project structure matches schema
- [ ] Verify technologies/roles/images are included
- [ ] Verify liveUrl and githubUrl fields present (nullable)
- [ ] Verify projects ordered by created_at DESC

### 9. Integration Tests - GET /api/projects/{slug}
- [ ] Create test_get_project_by_slug_success() with valid slug
- [ ] Verify 200 status code
- [ ] Verify response matches ProjectDetailResponse schema
- [ ] Verify all nested data present
- [ ] Create test_get_project_by_slug_not_found() with invalid slug
- [ ] Verify 404 status code
- [ ] Verify error message format

### 10. OpenAPI Documentation
- [ ] Start dev server
- [ ] Navigate to http://localhost:8000/api/docs
- [ ] Verify "projects" tag shows both endpoints
- [ ] Test GET /api/projects from Swagger UI
- [ ] Test GET /api/projects/{slug} from Swagger UI
- [ ] Verify response schemas display correctly
- [ ] Verify example responses are readable

### 11. Manual Testing
- [ ] Seed database with test data
- [ ] Test GET /api/projects with curl
- [ ] Verify JSON structure
- [ ] Test GET /api/projects/{valid-slug} with curl
- [ ] Test GET /api/projects/{invalid-slug} with curl
- [ ] Verify 404 response format
- [ ] Test with frontend proxy (if Story 2.4 started)

### 12. Verification
- [ ] All pytest tests pass
- [ ] Coverage >80% for router and repository
- [ ] OpenAPI docs accessible and accurate
- [ ] Manual curl tests succeed
- [ ] Response times <100ms (local testing)
- [ ] No N+1 query issues (check SQLAlchemy logs)

## Files to Create

- `/backend/app/schemas/project.py` - Pydantic response schemas
- `/backend/app/repositories/project_repository.py` - Database queries
- `/backend/app/routers/projects.py` - API endpoint handlers
- `/backend/tests/test_projects_api.py` - Integration tests

## Files to Modify

- `/backend/app/main.py` - Register projects router

## Dependencies

- Story 2.2 must be complete (Database models)
- Database must be seeded with test data

## Technical Notes

### Eager Loading Example
```python
from sqlalchemy.orm import joinedload

projects = (
    db.query(Project)
    .options(
        joinedload(Project.technologies),
        joinedload(Project.roles),
        joinedload(Project.links),
        joinedload(Project.images)
    )
    .order_by(Project.created_at.desc())
    .all()
)
```

### Field Aliasing for camelCase
```python
from pydantic import BaseModel, Field

class ProjectLinkSchema(BaseModel):
    id: str
    project_id: str = Field(alias="projectId")
    type: str
    url: str
    label: str

    class Config:
        from_attributes = True
        populate_by_name = True
```

### Expected Response Format
```json
{
  "id": "uuid",
  "title": "Project Title",
  "slug": "project-slug",
  "summary": "Brief summary",
  "description": "# Full markdown description",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo",
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

**Note:** `liveUrl` and `githubUrl` are nullable - will be null if project has no live site or GitHub repo.
