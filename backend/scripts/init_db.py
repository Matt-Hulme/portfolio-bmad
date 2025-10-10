#!/usr/bin/env python3
"""Database initialization script - creates all tables."""

import sys
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.database import init_db  # noqa: E402
from app.models import Project, ProjectImage, Role, Technology  # noqa: E402, F401

if __name__ == "__main__":
    try:
        print("Creating database tables...")
        init_db()
        print("✓ Database tables created successfully!")
    except Exception as e:
        print(f"✗ Error creating database tables: {e}")
        sys.exit(1)
