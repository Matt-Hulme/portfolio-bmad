# Technical Assumptions

## Repository Structure: Monorepo

Single repository containing both frontend (React/Vite) and backend (FastAPI) codebases, facilitating coordinated development and simplified deployment.

## Service Architecture

**Monolithic architecture with clear frontend/backend separation:**
- Frontend: React SPA served as static assets
- Backend: FastAPI REST API server
- Development: Vite dev server proxies API requests to FastAPI backend
- Production: Nginx reverse proxy routes `/api/*` to FastAPI, serves React static build for all other routes

This approach provides simplicity for a portfolio site while maintaining clean separation of concerns. No microservices or serverless complexity needed for this scale.

## Testing Requirements

**Comprehensive testing at all levels where it makes sense:**

**Frontend Testing:**
- **Vitest** - Unit and integration tests for utilities, hooks, and logic
- **React Testing Library** - Component testing with user-centric approach
- **Playwright** - E2E testing covering critical user flows (grid render, modal interactions, resume/contact pages)
- **Playwright MCP** - Enhanced browser automation with snapshots, interactions, and visual testing capabilities

**Backend Testing:**
- **pytest** - Unit and integration tests for API endpoints and business logic
- **pytest-asyncio** - Testing FastAPI async endpoints
- **Test fixtures** - Reusable test data and temporary database setup

**Development & Debugging Tools:**
- **Chrome DevTools MCP** - Performance profiling, network inspection, Core Web Vitals measurement, and browser debugging during development

Focus on testing where it provides clear value: user-facing functionality, business logic, and integration points. Avoid over-testing implementation details.

## Additional Technical Assumptions and Requests

**Frontend Stack:**
- React 19.1.1 with TypeScript 5.8+ for type safety
- Vite 7.1.4 for build tooling and dev server
- TailwindCSS 4.1.13 for utility-first styling
- shadcn/ui 3.0+ component library (Button, Card, Badge, Dialog baseline)
- React Router for client-side routing

**Backend Stack:**
- FastAPI 0.115.5 for REST API framework
- Python 3.13.7 runtime
- SQLAlchemy 2.0.36 for ORM and database interaction

**Database:**
- SQLite for both development and production (simpler deployment, sufficient for portfolio scale)

**Development Tooling:**
- ESLint for JavaScript/TypeScript linting
- Prettier for code formatting
- Ruff for Python linting
- Black for Python formatting

**AI Development Environment:**
- BMAD agent system for coordinated PM/Architect/UX/Dev workflows
- Playwright MCP and Chrome DevTools MCP available across Claude Code, Cursor, and Codex
- File-based handoff between AI tools using shared repository state

**Deployment:**
- VPS deployment with Nginx reverse proxy
- systemd service units for process management
- Basic deployment scripts and documentation

**Design System:**
- Tailwind tokens configured for consistent spacing, colors, typography
- shadcn/ui components as baseline (customizable with Tailwind)

---
