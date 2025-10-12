# BMAD Customization Guide

## Overview
This guide documents customizations to the standard BMAD-METHOD for this project. Use this as a reference when starting new BMAD projects to maintain consistency.

---

## Standard BMAD vs Custom BMAD

### What Standard BMAD Provides
- ✅ Epic → Story → Task hierarchy
- ✅ Sequential story implementation (one at a time)
- ✅ Manual DoD checklist validation
- ✅ QA agent integration (optional checkpoints)
- ✅ Risk-based testing strategy
- ✅ Documentation-heavy planning phase
- ✅ Story-level commits

### What We've Added (Custom BMAD)
- ✅ **Automated pre-commit hooks** (linting, formatting, typechecking, unit tests)
- ✅ **Automated pre-push hooks** (build verification, full test suite)
- ✅ **Task-level commits** with TDD (more granular than standard BMAD)
- ✅ **PR-per-story workflow** with branch protection
- ✅ **True TDD at task level** (test → implement → pass)
- ✅ **Story-level integration tests** (end of story task)
- ✅ **Epic-level E2E tests** (final story in epic)
- ✅ **Parallel story planning** (experimental, for independent stories)
- ✅ **Parallel implementation** (max 2 agents, using git worktrees)
- ✅ **MCP integrations** (Chrome DevTools for UX, Mermaid for diagrams)
- ✅ **Explicit `git pull origin main`** before feature branches
- ✅ **No auto-merge PRs** (user approval required)

---

## Detailed Customizations

### 1. Testing Strategy (TDD + Multi-Level)

**Standard BMAD**: Tests happen after implementation, optional QA checkpoints.

**Custom BMAD**: True TDD with three testing levels.

#### Task Level (Unit Tests)
- **Write test first** (red)
- **Implement feature** (green)
- **Refactor if needed**
- **Commit** (test + implementation together)

#### Story Level (Integration Tests)
- Last task in every story: "Add integration tests for [story name]"
- Tests interaction between features built in that story
- Validates story acceptance criteria

#### Epic Level (E2E Tests)
- Final story in epic: "E2E Testing & Epic Review for [epic name]"
- Tests entire user flows across epic features
- Includes test review and epic validation

**Tech Stack Agnostic**: Use appropriate testing tools per project (Jest/Vitest for unit, Playwright/Cypress for E2E, etc.)

---

### 2. Git Workflow & Automation

**Standard BMAD**: Create branch → Implement → Commit → Push

**Custom BMAD**: Enhanced with hooks and PR workflow.

#### Branch Creation
```bash
# Always pull latest main first
git pull origin main
git checkout -b feature/story-1-1-description
```

#### Commit Workflow (Per Task)
```bash
# 1. Make changes (TDD: test first, then implementation)
# 2. Stage files
git add .

# 3. Pre-commit hook runs automatically:
#    - Linting
#    - Formatting (auto-fix)
#    - Type checking
#    - Unit tests
#    - Dev server smoke test (optional)

# 4. If hooks pass, commit happens
git commit -m "feat: implement task 1.1.1"

# 5. If hooks fail:
#    - Auto-fix if possible (formatting/linting)
#    - Pause and ask user if can't auto-fix
```

#### Push Workflow (Per Story)
```bash
# After all story tasks complete
git push origin feature/story-1-1-description

# Pre-push hook runs automatically:
#    - Build check (npm run build)
#    - Full test suite (unit + integration)
#    - E2E tests (if applicable)
#    - No warnings allowed

# If hooks fail:
#    - Try to fix
#    - Pause and ask user if can't resolve
```

#### PR Workflow (Per Story)
```bash
# Create PR via GitHub CLI
gh pr create --title "Story 1.1: [Story Title]" --body "[Auto-generated summary]"

# PR Requirements:
# - Links to story doc
# - Summary of changes
# - Test coverage summary
# - No auto-merge (user must approve)

# Agent pauses and waits for user to:
# 1. Review PR
# 2. Merge manually
# 3. Confirm before agent continues to next story
```

---

### 3. Pre-Commit & Pre-Push Hooks

**Standard BMAD**: Manual DoD checklist only.

**Custom BMAD**: Automated hooks (Husky or native git hooks).

#### Pre-Commit Hook Setup (Per Project)
Hook should run automatically on `git commit`:
- **Linting**: Project-specific linter (ESLint, Ruff, etc.)
- **Formatting**: Auto-fix with project formatter (Prettier, Black, etc.)
- **Type checking**: Language-specific (TypeScript, mypy, etc.)
- **Unit tests**: Fast tests only (no integration/E2E)
- **Dev server smoke test** (optional): Quick startup check

#### Pre-Push Hook Setup (Per Project)
Hook should run automatically on `git push`:
- **Build verification**: Full production build
- **Complete test suite**: Unit + Integration tests
- **E2E tests**: If story includes UI changes
- **No warnings**: Zero tolerance for build/test warnings
- **Dependency check**: No security vulnerabilities

#### Hook Failure Handling
1. **Auto-fixable** (formatting, linting): Fix and show user changes
2. **Non-fixable** (tests failing, type errors): Pause and present error to user
3. **Never bypass hooks** without user approval

---

### 4. Story Planning Cadence

**Standard BMAD**: Plan one story → Implement → Plan next story (sequential)

**Custom BMAD**: Follow standard, but with parallel planning option.

#### Default: Sequential (BMAD Standard)
```
Epic 1 planning → Story 1.1 planning → Story 1.1 implementation →
Story 1.2 planning → Story 1.2 implementation → ...
```

#### Experimental: Parallel Planning
- **After epic is planned**, identify stories with no dependencies
- **Label stories**: `[PARALLELIZABLE]` or `[SEQUENTIAL]`
- **User decides**: Which stories to plan/implement in parallel
- **Never auto-parallelize**: Always present options, user chooses

Example:
```
Epic 1: Authentication System
- Story 1.1: User Registration [SEQUENTIAL - foundation]
- Story 1.2: Email Verification [PARALLELIZABLE after 1.1]
- Story 1.3: Password Reset [PARALLELIZABLE after 1.1]
- Story 1.4: E2E Auth Testing [SEQUENTIAL - final story]
```

---

### 5. Parallel Implementation (Git Worktrees)

**Standard BMAD**: One agent, one story at a time.

**Custom BMAD**: Up to 2 parallel agents for independent stories.

#### When to Use Parallel Implementation
- **Max 2 agents**: Don't exceed 2 simultaneous implementations
- **Independent stories only**: Story Y cannot depend on Story X
- **User-initiated**: Agent identifies candidates, user approves
- **Use git worktrees**: Avoid branch conflicts

#### Git Worktree Setup
```bash
# Main worktree (Agent 1)
git worktree add ../portfolio-bmad-story-1.2 feature/story-1-2

# Second worktree (Agent 2)
git worktree add ../portfolio-bmad-story-1.3 feature/story-1-3

# Both agents work independently
# Merge Story 1.2 first, then Story 1.3
```

#### Parallelization Decision Tree
1. **After epic planning**: Analyze story dependencies
2. **Identify candidates**: Stories with no cross-dependencies
3. **Present to user**: "Stories 1.2 and 1.3 can run in parallel. Proceed?"
4. **User chooses**: Yes (parallel) or No (sequential)
5. **Setup worktrees**: If parallel approved
6. **Merge order**: User decides merge order for PRs

---

### 6. Merge Conflict Resolution

**Standard BMAD**: Not explicitly specified.

**Custom BMAD**: Prefer feature branch, but always confirm with user.

#### Default Strategy
- **Always present conflicts to user**
- **Default preference**: Keep feature branch changes (current branch)
- **Never overwrite git history** without user approval
- **Provide conflict summary**: Show what's conflicting before resolution

#### Conflict Resolution Flow
```bash
# 1. Conflict detected
git pull origin main
# CONFLICT in src/components/Button.tsx

# 2. Agent analyzes conflict
# - Shows conflicting lines
# - Recommends resolution (prefer feature branch)

# 3. Pause for user decision
# - Accept feature branch changes (default)
# - Accept main branch changes
# - Manual resolution required

# 4. User approves resolution method
# 5. Agent resolves and continues
```

---

### 7. MCP Integrations

**Standard BMAD**: Not included.

**Custom BMAD**: Use MCPs for enhanced capabilities.

#### Chrome DevTools MCP (Preferred)
- **Use for**: UX testing, debugging, visual verification
- **When**: During story implementation with UI changes
- **Why over Playwright**: Better reliability for this project

#### Mermaid MCP
- **Use for**: User flow diagrams, architecture diagrams
- **When**: During planning phase (PRD, Architecture docs)
- **Output**: Visual documentation in `docs/diagrams/`

#### Future MCPs (Project-Specific)
- Add MCPs as needed per project
- Document in project's `README.md` or `docs/setup.md`

---

### 8. Quality Gates & Pauses

**Standard BMAD**: Manual DoD checklist, optional QA checkpoints.

**Custom BMAD**: Automated hooks + user approval gates.

#### Automated Gates (No User Pause)
- ✅ Pre-commit hooks (per task)
- ✅ Pre-push hooks (per story)
- ✅ Build verification
- ✅ Test suite execution

#### User Approval Gates (Pause Required)
- ⏸️ **PR creation**: User reviews and merges
- ⏸️ **Hook failures**: If auto-fix not possible
- ⏸️ **Merge conflicts**: Before resolution
- ⏸️ **Parallel work**: Before starting parallel implementation
- ⏸️ **Epic completion**: Before starting next epic

---

### 9. Branch Protection Rules

**Standard BMAD**: Not specified.

**Custom BMAD**: Strict branch protection.

#### Rules
- ❌ **No direct pushes to main/master**
- ✅ **All changes via PRs**
- ✅ **User must merge** (no auto-merge)
- ✅ **Pre-push hooks must pass** before PR creation
- ✅ **Pull latest main** before creating feature branch

#### Enforcement
```bash
# Bad (will fail)
git checkout main
git commit -m "direct commit"
git push origin main

# Good (correct workflow)
git checkout main
git pull origin main
git checkout -b feature/story-1-1
# ... make changes, commit, push ...
gh pr create
# ... user reviews and merges ...
```

---

### 10. Testing Organization

**Standard BMAD**: Not explicitly specified.

**Custom BMAD**: Project-specific, but with conventions.

#### React/Frontend Projects
```
src/
  components/
    Button/
      Button.tsx
      __tests__/
        Button.test.tsx
        Button.integration.test.tsx
```

#### Backend/API Projects
```
src/
  services/
    auth.service.ts
    __tests__/
      auth.service.test.ts
      auth.integration.test.ts
```

#### E2E Tests
```
tests/
  e2e/
    auth-flow.spec.ts
    checkout-flow.spec.ts
```

**Note**: Test organization is project-specific. Document in project's contributing guide.

---

### 11. TDD Compliance & Test Maintenance

**Standard BMAD**: Tests after implementation.

**Custom BMAD**: True TDD, with test maintenance rules.

#### When Tests Break During Refactoring
1. **Pause and analyze**: Is the test wrong or is the implementation wrong?
2. **Default assumption**: If test was passing before refactor, implementation likely broke
3. **Ask user if unclear**: "Test is failing after refactor. Should I update test or fix implementation?"
4. **Never delete tests to make them pass** without user approval

#### Red-Green-Refactor Cycle (Per Task)
```
1. Write failing test (RED)
2. Implement minimum code to pass (GREEN)
3. Refactor while keeping tests green
4. Commit (test + implementation together)
```

---

## First Message Template for New Projects

Use this template at the start of every new BMAD project:

```markdown
# Project: [Project Name]

## Custom BMAD Configuration

I'm using a customized version of BMAD-METHOD. Please follow these rules:

### Testing (TDD)
- Write unit tests BEFORE implementation (Red-Green-Refactor)
- Commit test + implementation together after passing
- Add integration test task at end of each story
- Add E2E test story as final story of each epic

### Git Workflow
- Pull latest main before creating feature branches
- Commit after EACH task completion (granular commits)
- Create PR after EACH story completion (no auto-merge)
- Pause after PR creation - I will review and merge manually

### Automation
- Setup pre-commit hooks: linting, formatting, typecheck, unit tests
- Setup pre-push hooks: build check, full test suite, E2E (if applicable)
- Auto-fix when possible (formatting/linting)
- Pause and ask me if hooks fail and can't auto-fix

### Branch Protection
- Never push directly to main/master
- All changes via PRs with my approval
- Prefer feature branch changes in merge conflicts (but ask me first)

### Parallelization
- Identify stories that can be implemented in parallel (max 2 agents)
- Label stories as [PARALLELIZABLE] or [SEQUENTIAL]
- Wait for my approval before starting parallel work
- Use git worktrees for parallel implementation

### MCP Tools
- Use Chrome DevTools MCP for UI/UX testing
- Use Mermaid MCP for diagrams during planning
- [Add project-specific MCPs here]

### Tech Stack
[Add your project's specific tech stack here]
- Frontend: [e.g., React + TypeScript + Vite]
- Testing: [e.g., Vitest + Playwright]
- Linting: [e.g., ESLint + Prettier]
- Backend: [e.g., Node.js + Express]
- Database: [e.g., PostgreSQL]

### Project-Specific Notes
[Add any project-specific customizations here]
```

---

## Checklist: Starting a New BMAD Project

- [ ] Copy First Message Template and customize for project
- [ ] Setup pre-commit hooks (or ask agent to set them up)
- [ ] Setup pre-push hooks (or ask agent to set them up)
- [ ] Configure branch protection rules on GitHub
- [ ] Install required MCP servers (Chrome DevTools, Mermaid, etc.)
- [ ] Document test organization conventions in project README
- [ ] Add project-specific tech stack preferences
- [ ] Verify git worktree support if planning parallel work
- [ ] Create `docs/stories/` directory for story documentation
- [ ] Create `docs/diagrams/` directory for Mermaid outputs

---

## Summary: Key Differences from Standard BMAD

| Aspect | Standard BMAD | Custom BMAD |
|--------|---------------|-------------|
| **Testing** | After implementation | TDD (test-first) |
| **Test Levels** | Flexible | Task (unit), Story (integration), Epic (E2E) |
| **Commits** | Per story | Per task (more granular) |
| **PRs** | Not specified | Per story, user-approved |
| **Hooks** | Manual DoD | Automated pre-commit & pre-push |
| **Parallelization** | Sequential only | Optional (max 2 agents, git worktrees) |
| **Branch Protection** | Not specified | Strict (no direct main pushes) |
| **MCP Integrations** | Not included | Chrome DevTools, Mermaid |
| **Merge Conflicts** | Not specified | Prefer feature branch, user confirms |
| **Story Planning** | Sequential | Sequential (with parallel option) |

---

## Questions & Troubleshooting

### "Should I update the test or fix the implementation?"
- If test was passing before: Fix implementation
- If test was wrong from start: Update test with user approval
- If unclear: Pause and ask user

### "Can these stories be parallelized?"
- Check for dependencies between stories
- If independent: Label as [PARALLELIZABLE]
- Present to user, never auto-parallelize
- Use git worktrees if approved

### "Pre-commit hook failed - what now?"
- Auto-fix if possible (formatting, linting)
- Show user what was fixed
- If can't fix (tests, type errors): Pause and present error

### "Should I merge this PR?"
- Never auto-merge
- Create PR and pause
- User reviews and merges manually
- Wait for user confirmation before continuing

---

## Version History
- **v1.0** (2025-01-12): Initial customization guide based on portfolio-bmad project
