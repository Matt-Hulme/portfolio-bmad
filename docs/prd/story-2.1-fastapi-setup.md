# Story 2.1: FastAPI Project Setup & Basic Server ✅ COMPLETE

**Status:** ✅ Complete (2025-10-10)

**As a** developer,
**I want** a properly configured FastAPI backend with project structure and development server,
**so that** I have a foundation for building REST API endpoints.

## Acceptance Criteria

- [x] FastAPI 0.115.5 project initialized in backend/ directory
- [x] Python 3.13.7 virtual environment configured with `uv` (10-100x faster than pip)
- [x] Dependencies installed via uv: FastAPI, Uvicorn, SQLAlchemy 2.0.36, pytest, pytest-asyncio, Ruff, Black
- [x] Basic FastAPI app created with health check endpoint (`GET /api/health`)
- [x] Ruff and Black configured for Python linting and formatting
- [x] Basic folder structure created (app/routers, app/models, app/schemas, tests/)
- [x] CORS middleware configured to allow frontend development server origin
- [x] Backend dev server runs successfully and health check returns 200 OK
- [x] pytest setup complete with basic health check test passing
- [x] README with uv installation instructions

## Task Breakdown

### 1. Project Initialization
- [x] Create backend/ directory structure
- [x] Install uv via Homebrew
- [x] Create virtual environment with `uv venv`
- [x] Create requirements.txt with all dependencies

### 2. Dependency Installation
- [x] Install FastAPI 0.115.5
- [x] Install Uvicorn with standard extras
- [x] Install SQLAlchemy 2.0.36
- [x] Install pydantic-settings for config management
- [x] Install pytest and pytest-asyncio
- [x] Install httpx for testing
- [x] Install Ruff and Black for code quality

### 3. Project Structure
- [x] Create app/ directory with __init__.py
- [x] Create app/routers/ directory
- [x] Create app/models/ directory
- [x] Create app/schemas/ directory
- [x] Create tests/ directory with __init__.py

### 4. FastAPI Application
- [x] Create app/main.py with FastAPI instance
- [x] Configure title, version, and docs URLs
- [x] Add CORS middleware for localhost:5173
- [x] Implement health check endpoint at /api/health
- [x] Return {"status": "ok", "version": "1.0.0"}

### 5. Configuration Files
- [x] Create pyproject.toml with Ruff, Black, pytest config
- [x] Configure Ruff: line-length=100, target=py313
- [x] Configure Black: line-length=100, target=py313
- [x] Configure pytest: asyncio_mode="auto", testpaths=["tests"]

### 6. Testing
- [x] Create tests/test_health.py
- [x] Write test for health check endpoint
- [x] Verify 200 status code
- [x] Verify response body structure
- [x] Run pytest and confirm passing

### 7. Development Server
- [x] Start uvicorn dev server on port 8000
- [x] Verify server starts successfully
- [x] Test health endpoint with curl
- [x] Confirm JSON response

### 8. Documentation
- [x] Create backend/README.md
- [x] Document uv installation
- [x] Document setup steps
- [x] Document dev server commands
- [x] Document testing commands
- [x] Document project structure

## Files Created

- `/backend/requirements.txt` - Python dependencies
- `/backend/app/__init__.py` - Package marker
- `/backend/app/main.py` - FastAPI application
- `/backend/app/routers/__init__.py` - Routers package
- `/backend/app/models/__init__.py` - Models package
- `/backend/app/schemas/__init__.py` - Schemas package
- `/backend/tests/__init__.py` - Tests package
- `/backend/tests/test_health.py` - Health check test
- `/backend/pyproject.toml` - Tool configuration
- `/backend/README.md` - Backend documentation

## Tech Stack Decisions

- **uv over pip:** Blazing fast Rust-based package manager (10-100x faster)
- **FastAPI 0.115.5:** Modern async web framework
- **Uvicorn:** ASGI server with standard extras (uvloop, httptools)
- **Ruff:** Fast Python linter (replaces flake8, isort, etc.)
- **Black:** Opinionated code formatter
- **pytest:** Testing framework with async support

## Verification

```bash
# Test passes
$ pytest -v
tests/test_health.py::test_health_check PASSED [100%]

# Server runs
$ uvicorn app.main:app --port 8000
INFO:     Uvicorn running on http://127.0.0.1:8000

# Health check works
$ curl http://127.0.0.1:8000/api/health
{"status":"ok","version":"1.0.0"}
```
