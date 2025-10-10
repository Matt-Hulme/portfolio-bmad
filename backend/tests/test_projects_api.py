"""Integration tests for projects API endpoints."""

import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker

from app.database import get_db
from app.main import app
from app.models import Project, ProjectImage, Role, Technology


@pytest.fixture
def client(test_db, test_session):
    """Create a test client with database session override."""

    # Override the get_db dependency to use the test database
    def override_get_db():
        # Create a new session from the test database for each request
        session_local = sessionmaker(autocommit=False, autoflush=False, bind=test_db)
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


class TestGetAllProjects:
    """Tests for GET /api/projects endpoint."""

    def test_get_all_projects_empty(self, client):
        """Test getting projects when database is empty."""
        response = client.get("/api/projects")
        assert response.status_code == 200
        assert response.json() == []

    def test_get_all_projects_with_data(self, client, test_session):
        """Test getting all projects with seeded data."""
        # Create technologies
        tech1 = Technology(id=str(uuid.uuid4()), name="React")
        tech2 = Technology(id=str(uuid.uuid4()), name="TypeScript")
        test_session.add_all([tech1, tech2])

        # Create roles
        role1 = Role(id=str(uuid.uuid4()), name="Frontend Developer")
        role2 = Role(id=str(uuid.uuid4()), name="Full Stack Developer")
        test_session.add_all([role1, role2])
        test_session.commit()

        # Create projects
        project1 = Project(
            id=str(uuid.uuid4()),
            title="First Project",
            slug="first-project",
            summary="First project summary",
            description="# First Project\n\nDetailed description",
            live_url="https://first.example.com",
            github_url="https://github.com/user/first-project",
        )
        project1.technologies.extend([tech1, tech2])
        project1.roles.append(role1)

        # Add image to project1
        image1 = ProjectImage(
            id=str(uuid.uuid4()),
            project_id=project1.id,
            url="/images/projects/first-project/screenshot.png",
            alt_text="First Project Screenshot",
            order_num=0,
        )
        project1.images.append(image1)

        project2 = Project(
            id=str(uuid.uuid4()),
            title="Second Project",
            slug="second-project",
            summary="Second project summary",
            description="# Second Project\n\nAnother description",
            live_url=None,  # Test nullable field
            github_url=None,  # Test nullable field
        )
        project2.technologies.append(tech2)
        project2.roles.append(role2)

        test_session.add_all([project1, project2])
        test_session.commit()

        # Make request
        response = client.get("/api/projects")

        # Verify response
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 2

        # Projects should be ordered by created_at DESC (newest first)
        # In practice, project2 was created after project1
        project_titles = [p["title"] for p in data]
        assert "First Project" in project_titles
        assert "Second Project" in project_titles

        # Verify first project structure
        first_project = next(p for p in data if p["slug"] == "first-project")
        assert first_project["title"] == "First Project"
        assert first_project["slug"] == "first-project"
        assert first_project["summary"] == "First project summary"
        assert first_project["description"] == "# First Project\n\nDetailed description"
        assert first_project["liveUrl"] == "https://first.example.com"
        assert first_project["githubUrl"] == "https://github.com/user/first-project"

        # Verify technologies
        assert len(first_project["technologies"]) == 2
        tech_names = [t["name"] for t in first_project["technologies"]]
        assert "React" in tech_names
        assert "TypeScript" in tech_names

        # Verify roles
        assert len(first_project["roles"]) == 1
        assert first_project["roles"][0]["name"] == "Frontend Developer"

        # Verify images
        assert len(first_project["images"]) == 1
        image = first_project["images"][0]
        assert image["url"] == "/images/projects/first-project/screenshot.png"
        assert image["altText"] == "First Project Screenshot"
        assert image["order"] == 0

        # Verify second project with nullable fields
        second_project = next(p for p in data if p["slug"] == "second-project")
        assert second_project["liveUrl"] is None
        assert second_project["githubUrl"] is None

        # Verify timestamps exist
        assert "createdAt" in first_project
        assert "updatedAt" in first_project


class TestGetProjectBySlug:
    """Tests for GET /api/projects/{slug} endpoint."""

    def test_get_project_by_slug_success(self, client, test_session):
        """Test getting a specific project by slug."""
        # Create test data
        tech = Technology(id=str(uuid.uuid4()), name="Python")
        role = Role(id=str(uuid.uuid4()), name="Backend Developer")
        test_session.add_all([tech, role])
        test_session.commit()

        project = Project(
            id=str(uuid.uuid4()),
            title="Test Project",
            slug="test-project",
            summary="Test summary",
            description="# Test Description",
            live_url="https://test.example.com",
            github_url="https://github.com/test/project",
        )
        project.technologies.append(tech)
        project.roles.append(role)

        image = ProjectImage(
            id=str(uuid.uuid4()),
            project_id=project.id,
            url="/images/projects/test-project/screenshot.png",
            alt_text="Screenshot",
            order_num=0,
        )
        project.images.append(image)

        test_session.add(project)
        test_session.commit()

        # Make request
        response = client.get("/api/projects/test-project")

        # Verify response
        assert response.status_code == 200
        data = response.json()

        assert data["title"] == "Test Project"
        assert data["slug"] == "test-project"
        assert data["summary"] == "Test summary"
        assert data["description"] == "# Test Description"
        assert data["liveUrl"] == "https://test.example.com"
        assert data["githubUrl"] == "https://github.com/test/project"

        # Verify nested data
        assert len(data["technologies"]) == 1
        assert data["technologies"][0]["name"] == "Python"

        assert len(data["roles"]) == 1
        assert data["roles"][0]["name"] == "Backend Developer"

        assert len(data["images"]) == 1
        assert data["images"][0]["url"] == "/images/projects/test-project/screenshot.png"
        assert data["images"][0]["altText"] == "Screenshot"

        # Verify timestamps
        assert "createdAt" in data
        assert "updatedAt" in data

    def test_get_project_by_slug_not_found(self, client):
        """Test getting a project with non-existent slug."""
        response = client.get("/api/projects/non-existent-slug")

        assert response.status_code == 404
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Project with slug 'non-existent-slug' not found"

    def test_get_project_by_slug_with_all_nullable_fields(self, client, test_session):
        """Test getting a project with all nullable fields set to None."""
        project = Project(
            id=str(uuid.uuid4()),
            title="Minimal Project",
            slug="minimal-project",
            summary="Minimal summary",
            description="Minimal description",
            live_url=None,
            github_url=None,
        )
        test_session.add(project)
        test_session.commit()

        response = client.get("/api/projects/minimal-project")

        assert response.status_code == 200
        data = response.json()

        assert data["liveUrl"] is None
        assert data["githubUrl"] is None
        assert data["technologies"] == []
        assert data["roles"] == []
        assert data["images"] == []
