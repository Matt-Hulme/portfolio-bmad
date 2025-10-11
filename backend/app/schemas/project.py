"""
Pydantic schemas for project API responses.
"""

from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class TechnologySchema(BaseModel):
    """Schema for technology data in API responses."""

    id: str
    name: str

    model_config = ConfigDict(from_attributes=True)


class RoleSchema(BaseModel):
    """Schema for role data in API responses."""

    id: str
    name: str

    model_config = ConfigDict(from_attributes=True)


class ProjectImageSchema(BaseModel):
    """Schema for project image data in API responses."""

    id: str
    project_id: str = Field(alias="projectId")
    url: str
    alt_text: str = Field(alias="altText")
    order_num: int = Field(alias="order")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class ProjectResponse(BaseModel):
    """Schema for project data in API responses."""

    id: str
    title: str
    slug: str
    summary: str
    description: str
    live_url: Optional[str] = Field(default=None, alias="liveUrl")
    github_url: Optional[str] = Field(default=None, alias="githubUrl")
    roles: list[RoleSchema] = Field(default_factory=list)
    technologies: list[TechnologySchema] = Field(default_factory=list)
    images: list[ProjectImageSchema] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# Alias for semantic clarity in endpoint definitions
ProjectDetailResponse = ProjectResponse
