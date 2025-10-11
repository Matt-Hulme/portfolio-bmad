#!/usr/bin/env python3
"""Migration script to remove created_at and updated_at columns from projects table."""

import sys
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import text  # noqa: E402

from app.database import engine  # noqa: E402


def migrate():
    """Remove created_at and updated_at columns from projects table."""

    with engine.begin() as conn:
        print(
            "Starting migration: removing created_at and updated_at columns"
            " from projects table..."
        )

        # SQLite doesn't support DROP COLUMN directly, so we need to:
        # 1. Create new table without timestamps
        # 2. Copy data from old table to new table
        # 3. Drop old table
        # 4. Rename new table to original name

        # Create temporary table with new schema (without timestamps)
        conn.execute(text("""
            CREATE TABLE projects_new (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                summary TEXT NOT NULL,
                description TEXT NOT NULL,
                live_url TEXT,
                github_url TEXT
            )
        """))
        print("✓ Created new table structure")

        # Copy data from old table to new table
        conn.execute(text("""
            INSERT INTO projects_new (id, title, slug, summary, description, live_url, github_url)
            SELECT id, title, slug, summary, description, live_url, github_url
            FROM projects
        """))
        print("✓ Copied project data to new table")

        # Drop old table
        conn.execute(text("DROP TABLE projects"))
        print("✓ Dropped old table")

        # Rename new table to original name
        conn.execute(text("ALTER TABLE projects_new RENAME TO projects"))
        print("✓ Renamed new table to 'projects'")

        # Recreate index on slug
        conn.execute(text("CREATE UNIQUE INDEX ix_projects_slug ON projects (slug)"))
        print("✓ Recreated index on slug")

        print("✓ Migration completed successfully!")

if __name__ == "__main__":
    try:
        migrate()
    except Exception as e:
        print(f"✗ Migration failed: {e}")
        sys.exit(1)
