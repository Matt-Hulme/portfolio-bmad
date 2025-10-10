# Portfolio Backend API

FastAPI backend for portfolio website.

## Setup

**Requirements:**
- Python 3.13.7
- uv (package manager)

**Install uv:**
```bash
brew install uv
```

**Create virtual environment and install dependencies:**
```bash
uv venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
uv pip install -r requirements.txt
```

## Development

**Start dev server:**
```bash
uvicorn app.main:app --reload --port 8000
```

**Run tests:**
```bash
pytest -v
```

**Lint:**
```bash
ruff check .
```

**Format:**
```bash
black .
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/docs` - Swagger UI documentation
- `GET /api/redoc` - ReDoc documentation

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app
│   ├── routers/          # API route handlers
│   ├── models/           # SQLAlchemy models
│   └── schemas/          # Pydantic schemas
├── tests/                # pytest tests
├── requirements.txt      # Python dependencies
├── pyproject.toml        # Ruff, Black, pytest config
└── README.md
```
