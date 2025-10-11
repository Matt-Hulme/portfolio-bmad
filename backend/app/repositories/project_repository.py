"""
Repository for project data access operations.
"""

from typing import Optional

from sqlalchemy.orm import Session, joinedload

from app.models import Project


class ProjectRepository:
    """Repository class for managing project database operations."""

    def __init__(self, db: Session):
        """
        Initialize the repository with a database session.

        Args:
            db: SQLAlchemy database session
        """
        self.db = db

    def get_all_projects(self) -> list[Project]:
        """
        Retrieve all projects with eager loading of related data.

        Returns:
            List of Project models ordered by title
        """
        return (
            self.db.query(Project)
            .options(
                joinedload(Project.technologies),
                joinedload(Project.roles),
                joinedload(Project.images),
            )
            .order_by(Project.title)
            .all()
        )

    def get_project_by_slug(self, slug: str) -> Optional[Project]:
        """
        Retrieve a single project by slug with eager loading of related data.

        Args:
            slug: The project slug to search for

        Returns:
            Project model if found, None otherwise
        """
        return (
            self.db.query(Project)
            .options(
                joinedload(Project.technologies),
                joinedload(Project.roles),
                joinedload(Project.images),
            )
            .filter(Project.slug == slug)
            .first()
        )
