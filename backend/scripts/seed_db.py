#!/usr/bin/env python3
"""Database seeding script - populates database with project data from CSV."""

import csv
import re
import sys
import uuid
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.database import SessionLocal, init_db  # noqa: E402
from app.models import Project, ProjectImage, Role, Technology  # noqa: E402


def extract_technologies(description: str | None) -> list[str]:
    """
    Extract technologies from markdown Tech Stack section.

    Args:
        description: Full project description markdown

    Returns:
        List of unique technology names
    """
    if not description:
        return []

    technologies = set()

    # Find Tech Stack section
    tech_stack_match = re.search(r"### Tech Stack\s*\n(.*?)(?=\n###|\Z)", description, re.DOTALL)

    if tech_stack_match:
        tech_section = tech_stack_match.group(1)

        # Extract technologies from lines like "- **Frontend:** TypeScript, React, TailwindCSS"
        for line in tech_section.split("\n"):
            if ":" in line:
                # Get everything after the colon
                tech_list = line.split(":", 1)[1]

                # Split by comma and clean up
                for tech in tech_list.split(","):
                    tech = tech.strip()
                    # Remove ** prefix/suffix from markdown bold formatting
                    tech = tech.strip("*").strip()
                    if tech and tech != "None":
                        technologies.add(tech)

    return sorted(list(technologies))


def parse_roles(roles_str: str | None) -> list[str]:
    """
    Parse roles from semicolon-separated string.

    Args:
        roles_str: Raw roles string from CSV (e.g., "Frontend Dev; AI Engineer")

    Returns:
        List of unique role names
    """
    if not roles_str or roles_str == "None":
        return []

    roles = set()
    for role in roles_str.split(";"):
        role = role.strip()
        if role and role != "None":
            roles.add(role)

    return sorted(list(roles))


def get_image_mappings() -> dict[str, list[dict]]:
    """
    Map image files from backend static directory to project slugs.

    Returns:
        Dictionary mapping project slugs to lists of image info dicts
    """
    # Get the backend static images directory
    static_dir = backend_dir / "static" / "images" / "projects"

    # Mapping of CSV project slugs to (directory_name, [files])
    # CSV slugs have spaces/caps, directories use lowercase-with-dashes
    image_mappings = {
        "Travelpass Lists": (
            "travelpass-lists",
            [
                "Lists-1.png",
                "Lists-2.png",
                "Lists-3.png",
                "Lists-4.png",
                "Lists-5-M.png",
            ],
        ),
        "Travelpass Dashboard": (
            "travelpass-dashboard",
            [
                "Dashboard-1.png",
                "Dashboard-2.png",
                "Dashboard-3.png",
                "Dashboard-4.png",
                "Dashboard-5.png",
                "Dashboard-6-M.png",
            ],
        ),
        "Travelpass Profiles": (
            "travelpass-profiles",
            [
                "Profile-1.png",
                "Profile-2.png",
                "Profile-3.png",
                "Profile-4-M.png",
            ],
        ),
        "Star Wars Archive 1": ("star-wars-archive-1", ["sw-v1-home.png", "sw-v1-characters.png"]),
        "Star Wars Archive 2": (
            "star-wars-archive-2",
            [
                "sw-v2-Home.png",
                "sw-v2-Characters.png",
                "sw-v2-CharactersList.png",
                "sw-v2-characterdetails.png",
                "sw-v2-Films-M.png",
            ],
        ),
        "Where Have You Traveled": (
            "scratch-map",
            ["scratch-map-1.png", "scratch-map-2.png", "scratch-map-3-M.png"],
        ),
        "Brainstormer": (
            "Brainstormer",
            [
                "brainstormer-demo.mp4",
            ],
        ),
    }

    # Convert to the format expected by the seeder
    result = {}
    for slug, (directory_name, files) in image_mappings.items():
        images = []
        for i, filename in enumerate(files):
            file_path = static_dir / directory_name / filename
            if file_path.exists():
                # Determine URL path based on file type
                is_video = filename.lower().endswith((".mov", ".mp4", ".webm"))
                url_prefix = "/videos/projects" if is_video else "/images/projects"

                # Clean up filename for URL (replace spaces with hyphens, preserve case)
                clean_name = filename.replace(" ", "-")

                images.append(
                    {
                        "url": f"{url_prefix}/{directory_name}/{clean_name}",
                        "alt_text": f"{slug.replace('-', ' ').title()} - Image {i + 1}",
                        "order_num": i,
                    }
                )
        if images:
            result[slug] = images

    return result


def seed_database():
    """Seed the database with project data from CSV."""
    # Initialize database tables
    init_db()

    # Create database session
    db = SessionLocal()

    try:
        # Clear existing data
        print("Clearing existing data...")
        db.query(ProjectImage).delete()
        db.query(Project).delete()
        db.query(Technology).delete()
        db.query(Role).delete()
        db.commit()

        # Get image mappings
        image_mappings = get_image_mappings()

        # Tracking sets for unique technologies and roles
        technologies_dict = {}
        roles_dict = {}

        # Read and parse CSV
        csv_path = (
            backend_dir.parent
            / "frontend"
            / "src"
            / "data"
            / "projects-data"
            / "projects-standardized.csv"
        )

        print(f"Reading projects from {csv_path}...")

        with open(csv_path, "r", encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f, quoting=csv.QUOTE_MINIMAL)
            projects = list(reader)

        print(f"Found {len(projects)} projects in CSV")

        # Filter out invalid rows (rows without a slug or with malformed data)
        valid_projects = []
        for row in projects:
            slug = row.get("Project Slug", "").strip() if row.get("Project Slug") else ""
            title = row.get("Project Title", "").strip() if row.get("Project Title") else ""

            # Skip rows with invalid slugs or titles that look like description fragments
            if slug and title and not title.startswith("-") and not title.startswith("#"):
                valid_projects.append(row)

        print(f"Valid projects after filtering: {len(valid_projects)}")

        # First pass: Extract all unique technologies and roles
        print("Extracting technologies and roles...")
        for row in valid_projects:
            # Extract technologies
            techs = extract_technologies(row.get("Full Description"))
            for tech_name in techs:
                if tech_name not in technologies_dict:
                    tech = Technology(id=str(uuid.uuid4()), name=tech_name)
                    technologies_dict[tech_name] = tech

            # Parse roles
            role_names = parse_roles(row.get("Role(s)"))
            for role_name in role_names:
                if role_name not in roles_dict:
                    role = Role(id=str(uuid.uuid4()), name=role_name)
                    roles_dict[role_name] = role

        # Add technologies and roles to database
        print(f"Adding {len(technologies_dict)} technologies...")
        db.add_all(technologies_dict.values())

        print(f"Adding {len(roles_dict)} roles...")
        db.add_all(roles_dict.values())

        db.commit()

        # Second pass: Create projects with relationships
        print("Creating projects...")
        for order_num, row in enumerate(valid_projects):
            project_slug = row["Project Slug"]
            print(f"  - {row['Project Title']} ({project_slug})")

            # Create project
            project = Project(
                id=str(uuid.uuid4()),
                title=row["Project Title"],
                slug=project_slug,
                summary=row.get("Summary", ""),
                description=row.get("Full Description", ""),
                live_url=row.get("Live Site URL") if row.get("Live Site URL") != "None" else None,
                github_url=row.get("GH Repo") if row.get("GH Repo") != "None" else None,
                order_num=order_num,
            )

            # Add technology relationships
            techs = extract_technologies(row.get("Full Description"))
            for tech_name in techs:
                project.technologies.append(technologies_dict[tech_name])

            # Add role relationships
            role_names = parse_roles(row.get("Role(s)"))
            for role_name in role_names:
                project.roles.append(roles_dict[role_name])

            # Add images
            if project_slug in image_mappings:
                for img_data in image_mappings[project_slug]:
                    image = ProjectImage(
                        id=str(uuid.uuid4()),
                        project_id=project.id,
                        url=img_data["url"],
                        alt_text=img_data["alt_text"],
                        order_num=img_data["order_num"],
                    )
                    project.images.append(image)

            db.add(project)

        db.commit()
        print(f"\n✓ Successfully seeded {len(valid_projects)} projects!")
        print(f"✓ Created {len(technologies_dict)} technologies")
        print(f"✓ Created {len(roles_dict)} roles")

    except Exception as e:
        print(f"\n✗ Error seeding database: {e}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
