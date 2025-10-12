# BMAD Custom Configuration - First Message Template

**Copy everything below this line and paste as your first message in a new BMAD session.**

---

# Project: [PROJECT_NAME]

I'm using a customized version of BMAD-METHOD. Please follow these rules throughout this project.

## Tech Stack
- **Frontend**: [e.g., React + TypeScript + Vite]
- **Backend**: [e.g., Node.js + Express]
- **Database**: [e.g., PostgreSQL]
- **Testing**: [e.g., Vitest + Playwright]
- **Linting**: [e.g., ESLint + Prettier]

## Custom BMAD Rules

### 1. Testing Strategy (True TDD)
- **Task Level (Unit Tests)**:
  - Write test FIRST (red)
  - Implement feature to pass test (green)
  - Refactor if needed
  - Commit test + implementation together
  - Every task implicitly includes its unit tests

- **Story Level (Integration Tests)**:
  - Add integration test task at END of each story
  - Tests interaction between story's features
  - Validates story acceptance criteria

- **Epic Level (E2E Tests)**:
  - Final story in each epic is "E2E Testing & Epic Review"
  - Tests complete user flows across epic
  - Includes epic validation and review

- **Test Maintenance**:
  - Never delete tests to make them pass
  - If test breaks during refactor, pause and ask me: update test or fix implementation?
  - Default assumption: if test was passing before, implementation probably broke

### 2. Git Workflow
- **Before creating feature branch**: Always `git pull origin main`
- **Commits**: After EACH task completion (granular commits)
- **PRs**: After EACH story completion
- **Branch protection**: Never push directly to main/master
- **Merge conflicts**: Prefer feature branch changes by default, but ASK ME before resolving

### 3. Automation Hooks
Setup pre-commit and pre-push hooks (Husky or native git hooks):

- **Pre-commit (runs on `git commit`)**:
  - Linting (project-specific linter)
  - Formatting (auto-fix with project formatter)
  - Type checking (TypeScript, mypy, etc.)
  - Unit tests (fast tests only)
  - Dev server smoke test (optional)

- **Pre-push (runs on `git push`)**:
  - Build verification (full production build)
  - Complete test suite (unit + integration)
  - E2E tests (if story has UI changes)
  - Zero warnings tolerance
  - Security vulnerability check

- **Hook failures**:
  - Auto-fix if possible (formatting, linting) and show me what was fixed
  - If can't auto-fix (tests failing, type errors), pause and present error to me

### 4. PR Workflow
- Create PR via GitHub CLI after story completion
- PR must include:
  - Link to story doc
  - Summary of changes
  - Test coverage summary
- **NO AUTO-MERGE**: Pause after PR creation and wait for me to review and merge manually
- Only continue to next story after I confirm merge

### 5. Story Planning Cadence
- Follow standard BMAD: Plan one story → Implement → Plan next story
- **Exception**: If I request parallel planning, identify stories with no dependencies and label them:
  - `[PARALLELIZABLE]` - Can be built independently
  - `[SEQUENTIAL]` - Must be built in order

### 6. Parallel Implementation (Optional)
- **Max 2 agents** working simultaneously
- **Only for independent stories** (Story Y cannot depend on Story X)
- **Use git worktrees** to avoid branch conflicts
- **Process**:
  1. After epic planning, identify stories safe for parallel work
  2. Present candidates to me: "Stories 1.2 and 1.3 can run in parallel. Proceed?"
  3. Wait for my approval before setting up worktrees
  4. I'll decide merge order for parallel PRs

### 7. MCP Integrations
- **Chrome DevTools MCP**: Use for UI/UX testing, debugging, visual verification
- **Mermaid MCP**: Use for user flow diagrams and architecture diagrams during planning
- Save Mermaid diagrams to `docs/diagrams/`

### 8. Quality Gates & Pauses

**Automated (no pause needed)**:
- Pre-commit hooks
- Pre-push hooks
- Build verification
- Test execution

**User approval required (PAUSE and wait for me)**:
- PR creation and merge
- Hook failures that can't be auto-fixed
- Merge conflict resolution
- Before starting parallel implementation
- Before starting next epic

### 9. Documentation Structure
- Story docs: `docs/stories/story-[epic].[story]-[name].md`
- Diagrams: `docs/diagrams/`
- Process docs: `docs/process/`
- Architecture: `docs/architecture.md`
- PRD: `docs/prd.md`

### 10. Test Organization
[Customize per project - example for React:]
```
src/
  components/
    Button/
      Button.tsx
      __tests__/
        Button.test.tsx
        Button.integration.test.tsx

tests/
  e2e/
    auth-flow.spec.ts
```

---

## Project-Specific Customizations
[Add any additional project-specific rules here]

---

## Quick Reference: Custom BMAD vs Standard BMAD

| What | Standard BMAD | Custom BMAD |
|------|---------------|-------------|
| Testing | After implementation | TDD (test-first) |
| Commits | Per story | Per task |
| PRs | Not specified | Per story, user-approved |
| Hooks | Manual checklist | Automated pre-commit/pre-push |
| Parallelization | Sequential only | Optional (2 agents max, worktrees) |
| Branch Protection | Not specified | Strict (no direct main pushes) |

---

**Ready to start? Let's begin with [Planning/First Epic/First Story]!**
