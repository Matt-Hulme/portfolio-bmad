"""Tests for SQLAlchemy models."""

import uuid

import pytest

from app.models import Project, ProjectImage, Role, Technology


def test_create_technology(test_session):
    """Test creating a Technology model."""
    tech = Technology(id=str(uuid.uuid4()), name="FastAPI")
    test_session.add(tech)
    test_session.commit()
    test_session.refresh(tech)

    assert tech.id is not None
    assert tech.name == "FastAPI"


def test_create_role(test_session):
    """Test creating a Role model."""
    role = Role(id=str(uuid.uuid4()), name="Fullstack Developer")
    test_session.add(role)
    test_session.commit()
    test_session.refresh(role)

    assert role.id is not None
    assert role.name == "Fullstack Developer"


def test_create_project(test_session):
    """Test creating a Project model."""
    project = Project(
        id=str(uuid.uuid4()),
        title="My Project",
        slug="my-project",
        summary="A project summary",
        description="A detailed description",
        live_url="https://example.com",
        github_url="https://github.com/user/repo",
    )
    test_session.add(project)
    test_session.commit()
    test_session.refresh(project)

    assert project.id is not None
    assert project.title == "My Project"
    assert project.slug == "my-project"
    assert project.created_at is not None
    assert project.updated_at is not None


def test_project_technology_relationship(test_session, sample_technology):
    """Test many-to-many relationship between Project and Technology."""
    project = Project(
        id=str(uuid.uuid4()),
        title="Tech Project",
        slug="tech-project",
        summary="Summary",
        description="Description",
    )
    project.technologies.append(sample_technology)
    test_session.add(project)
    test_session.commit()
    test_session.refresh(project)

    assert len(project.technologies) == 1
    assert project.technologies[0].name == "Python"
    assert len(sample_technology.projects) == 1
    assert sample_technology.projects[0].title == "Tech Project"


def test_project_role_relationship(test_session, sample_role):
    """Test many-to-many relationship between Project and Role."""
    project = Project(
        id=str(uuid.uuid4()),
        title="Role Project",
        slug="role-project",
        summary="Summary",
        description="Description",
    )
    project.roles.append(sample_role)
    test_session.add(project)
    test_session.commit()
    test_session.refresh(project)

    assert len(project.roles) == 1
    assert project.roles[0].name == "Backend Developer"
    assert len(sample_role.projects) == 1
    assert sample_role.projects[0].title == "Role Project"


def test_project_image_relationship(test_session):
    """Test one-to-many relationship between Project and ProjectImage."""
    project = Project(
        id=str(uuid.uuid4()),
        title="Image Project",
        slug="image-project",
        summary="Summary",
        description="Description",
    )
    test_session.add(project)
    test_session.commit()

    # Add multiple images
    for i in range(3):
        image = ProjectImage(
            id=str(uuid.uuid4()),
            project_id=project.id,
            url=f"/images/projects/image-project/img{i}.png",
            alt_text=f"Image {i}",
            order_num=i,
        )
        test_session.add(image)

    test_session.commit()
    test_session.refresh(project)

    assert len(project.images) == 3
    assert project.images[0].order_num == 0
    assert project.images[1].order_num == 1
    assert project.images[2].order_num == 2


def test_cascade_delete_images(test_session, sample_project):
    """Test that deleting a project cascades to images."""
    project_id = sample_project.id
    num_images = len(sample_project.images)

    assert num_images > 0

    # Delete project
    test_session.delete(sample_project)
    test_session.commit()

    # Verify images were deleted
    remaining_images = (
        test_session.query(ProjectImage).filter(ProjectImage.project_id == project_id).all()
    )
    assert len(remaining_images) == 0


def test_unique_slug_constraint(test_session):
    """Test that project slugs must be unique."""
    project1 = Project(
        id=str(uuid.uuid4()),
        title="Project 1",
        slug="unique-slug",
        summary="Summary",
        description="Description",
    )
    test_session.add(project1)
    test_session.commit()

    # Try to create another project with the same slug
    project2 = Project(
        id=str(uuid.uuid4()),
        title="Project 2",
        slug="unique-slug",
        summary="Summary",
        description="Description",
    )
    test_session.add(project2)

    with pytest.raises(Exception):
        test_session.commit()


def test_unique_technology_name(test_session):
    """Test that technology names must be unique."""
    tech1 = Technology(id=str(uuid.uuid4()), name="React")
    test_session.add(tech1)
    test_session.commit()

    # Try to create another technology with the same name
    tech2 = Technology(id=str(uuid.uuid4()), name="React")
    test_session.add(tech2)

    with pytest.raises(Exception):
        test_session.commit()


def test_unique_role_name(test_session):
    """Test that role names must be unique."""
    role1 = Role(id=str(uuid.uuid4()), name="Frontend Dev")
    test_session.add(role1)
    test_session.commit()

    # Try to create another role with the same name
    role2 = Role(id=str(uuid.uuid4()), name="Frontend Dev")
    test_session.add(role2)

    with pytest.raises(Exception):
        test_session.commit()


def test_query_by_slug(test_session, sample_project):
    """Test querying projects by slug."""
    result = test_session.query(Project).filter(Project.slug == "test-project").first()

    assert result is not None
    assert result.title == "Test Project"
    assert result.slug == "test-project"


def test_nullable_urls(test_session):
    """Test that live_url and github_url can be null."""
    project = Project(
        id=str(uuid.uuid4()),
        title="No URLs Project",
        slug="no-urls",
        summary="Summary",
        description="Description",
        live_url=None,
        github_url=None,
    )
    test_session.add(project)
    test_session.commit()
    test_session.refresh(project)

    assert project.live_url is None
    assert project.github_url is None
