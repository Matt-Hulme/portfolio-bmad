"""
API router for project endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.project_repository import ProjectRepository
from app.schemas import ProjectDetailResponse, ProjectResponse

router = APIRouter()


@router.get("/projects", response_model=list[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """
    Retrieve all projects with related technologies, roles, links, and images.

    Returns:
        List of projects ordered by creation date (newest first)
    """
    repo = ProjectRepository(db)
    projects = repo.get_all_projects()
    return projects


@router.get("/projects/{slug}", response_model=ProjectDetailResponse)
async def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Retrieve a single project by its slug with all related data.

    Args:
        slug: The unique slug identifier for the project

    Returns:
        Project details with technologies, roles, links, and images

    Raises:
        HTTPException: 404 if project with given slug is not found
    """
    repo = ProjectRepository(db)
    project = repo.get_project_by_slug(slug)

    if project is None:
        raise HTTPException(status_code=404, detail=f"Project with slug '{slug}' not found")

    return project
