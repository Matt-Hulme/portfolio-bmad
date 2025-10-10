"""SQLAlchemy models for projects and related entities."""

from datetime import UTC, datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import relationship

from app.database import Base

# Junction table for project-technology many-to-many relationship
project_technologies = Table(
    "project_technologies",
    Base.metadata,
    Column("project_id", String, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column(
        "technology_id", String, ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True
    ),
)

# Junction table for project-role many-to-many relationship
project_roles = Table(
    "project_roles",
    Base.metadata,
    Column("project_id", String, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", String, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
)


class Project(Base):
    """Project model representing portfolio projects."""

    __tablename__ = "projects"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    live_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC), nullable=False)
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )

    # Relationships
    technologies = relationship(
        "Technology", secondary=project_technologies, back_populates="projects"
    )
    roles = relationship("Role", secondary=project_roles, back_populates="projects")
    images = relationship(
        "ProjectImage",
        back_populates="project",
        cascade="all, delete-orphan",
        order_by="ProjectImage.order_num",
    )


class Technology(Base):
    """Technology model representing tech stack items."""

    __tablename__ = "technologies"

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, index=True, nullable=False)

    # Relationships
    projects = relationship(
        "Project", secondary=project_technologies, back_populates="technologies"
    )


class Role(Base):
    """Role model representing project roles."""

    __tablename__ = "roles"

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, index=True, nullable=False)

    # Relationships
    projects = relationship("Project", secondary=project_roles, back_populates="roles")


class ProjectImage(Base):
    """ProjectImage model representing project images and videos."""

    __tablename__ = "project_images"

    id = Column(String, primary_key=True)
    project_id = Column(String, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    alt_text = Column(String, nullable=False)
    order_num = Column(Integer, default=0, nullable=False)

    # Relationships
    project = relationship("Project", back_populates="images")
