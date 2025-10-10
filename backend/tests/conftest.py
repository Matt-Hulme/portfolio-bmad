"""Pytest fixtures for testing."""

import uuid

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base
from app.models import Project, ProjectImage, Role, Technology


@pytest.fixture(scope="function")
def test_db():
    """Create an in-memory SQLite database for testing."""
    # Create in-memory database
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})

    # Create tables
    Base.metadata.create_all(bind=engine)

    yield engine

    # Clean up
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def test_session(test_db):
    """Create a new database session for testing."""
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=test_db)  # noqa: N806
    session = session_local()

    yield session

    session.close()


@pytest.fixture
def sample_technology(test_session):
    """Create a sample Technology for testing."""
    tech = Technology(id=str(uuid.uuid4()), name="Python")
    test_session.add(tech)
    test_session.commit()
    test_session.refresh(tech)
    return tech


@pytest.fixture
def sample_role(test_session):
    """Create a sample Role for testing."""
    role = Role(id=str(uuid.uuid4()), name="Backend Developer")
    test_session.add(role)
    test_session.commit()
    test_session.refresh(role)
    return role


@pytest.fixture
def sample_project(test_session, sample_technology, sample_role):
    """Create a sample Project for testing."""
    project = Project(
        id=str(uuid.uuid4()),
        title="Test Project",
        slug="test-project",
        summary="A test project summary",
        description="A detailed test project description",
        live_url="https://example.com",
        github_url="https://github.com/test/project",
    )

    # Add relationships
    project.technologies.append(sample_technology)
    project.roles.append(sample_role)

    # Add an image
    image = ProjectImage(
        id=str(uuid.uuid4()),
        project_id=project.id,
        url="/images/projects/test-project/home.png",
        alt_text="Test Project Home",
        order_num=0,
    )
    project.images.append(image)

    test_session.add(project)
    test_session.commit()
    test_session.refresh(project)

    return project
