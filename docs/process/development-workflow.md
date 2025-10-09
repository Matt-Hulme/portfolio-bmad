# Development Workflow & Process

This document captures all process improvements, validation checks, and workflow patterns established during development. Use this as a reference for future projects.

---

## Git Workflow

### Branch Protection

**Main Branch Protection Rules:**
- Direct pushes to `main` are **blocked**
- All changes must go through pull requests
- Linear history required (no merge commits)
- No force pushes allowed
- No branch deletion allowed

**Configuration:**
```bash
gh api repos/:owner/:repo/branches/main/protection -X PUT --input - <<'EOF'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": false,
  "lock_branch": false,
  "allow_fork_syncing": true
}
EOF
```

### Branch Naming Convention

- Feature branches: `story/X.Y-story-name`
- Bug fixes: `fix/description`
- Hotfixes: `hotfix/description`

### Commit Message Format

```
Story X.Y: Complete Task N - Task Title

Task Completed:
- Task N: Task Title
  - Detailed bullet points of what was done
  - Changes made
  - Features added

Changes:
- file/path - description of change

Features/Notes:
- Key features or important notes

Next: Task N+1 - Next Task Title

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Pre-Commit Checks

### Husky Configuration

**Location:** `.husky/pre-commit`

**Checks Performed:**
1. **lint-staged** - Runs on staged files only
   - Format check with Prettier
   - Lint with ESLint (--fix for auto-fixes)
   - TypeScript type check (tsc --noEmit)

**Configuration:** `package.json`
```json
{
  "lint-staged": {
    "frontend/**/*.{ts,tsx}": [
      "cd frontend && npm run format",
      "cd frontend && npm run lint --fix",
      "cd frontend && npx tsc --noEmit"
    ],
    "backend/**/*.py": [
      "cd backend && black .",
      "cd backend && ruff check --fix",
      "cd backend && mypy ."
    ]
  }
}
```

**Purpose:**
- Catch formatting/lint/type errors before commit
- Auto-fix issues when possible
- Fast feedback loop (only checks staged files)

---

## Pre-PR Validation

### Full Validation Script

**Location:** `package.json` scripts

**Script Name:** `pre-pr:frontend`

**Full Command:**
```bash
cd frontend && npm test -- --run && bash ../scripts/check-dev-server.sh && npm run build && npm run lint && npx tsc --noEmit
```

**Checks Performed (in order):**

1. **Unit Tests** (`npm test -- --run`)
   - All Vitest tests must pass
   - Ensures code functionality

2. **Dev Server Health Check** (`bash ../scripts/check-dev-server.sh`)
   - Starts dev server
   - Checks for console errors/warnings
   - Detects runtime errors that tests/build/lint miss
   - Validates import resolution
   - See: [Dev Server Health Check](#dev-server-health-check) below

3. **Production Build** (`npm run build`)
   - TypeScript compilation (tsc -b)
   - Vite production build
   - Ensures code builds successfully
   - Validates no build-time errors

4. **Linting** (`npm run lint`)
   - ESLint checks all files
   - Catches code quality issues
   - Enforces style guidelines

5. **Type Checking** (`npx tsc --noEmit`)
   - Full TypeScript type check
   - Stricter than build-time checks
   - Ensures type safety across entire codebase

**When to Run:**
- Before creating a PR
- After completing all tasks in a story
- Before merging to main

**Purpose:**
- Comprehensive validation before code review
- Catches issues early (runtime, build, lint, type errors)
- Ensures high code quality
- Prevents broken code from reaching main

---

## Dev Server Health Check

### Purpose
Catch **runtime errors** that other checks miss:
- Import resolution errors
- Module not found errors
- Console errors/warnings
- Runtime crashes
- JavaScript errors

### Script Location
`scripts/check-dev-server.sh`

### How It Works
1. Kills any existing dev server on port 5173
2. Starts dev server in background
3. Waits for server to start (max 15 seconds)
4. Checks logs for error patterns:
   - `error:`
   - `failed to`
   - `cannot find`
   - `module not found`
   - `Failed to resolve import`
5. Returns success if no errors detected
6. Cleans up dev server on exit

### Script Content
```bash
#!/bin/bash
set -e

cd "$(dirname "$0")/../frontend"

echo "🚀 Starting dev server for health check..."

# Clean up any existing dev server on port 5173
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Start dev server and capture output
npm run dev > /tmp/vite-health-check.log 2>&1 &
DEV_PID=$!

# Ensure cleanup on script exit
cleanup() {
  echo "🧹 Cleaning up dev server..."
  kill $DEV_PID 2>/dev/null || true
  lsof -ti:5173 | xargs kill -9 2>/dev/null || true
}
trap cleanup EXIT

# Wait for server to start (max 15 seconds)
echo "⏳ Waiting for dev server to start..."
for i in {1..30}; do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Dev server started successfully on http://localhost:5173"
    break
  fi

  if ! kill -0 $DEV_PID 2>/dev/null; then
    echo "❌ Dev server process died unexpectedly"
    tail -50 /tmp/vite-health-check.log
    exit 1
  fi

  sleep 0.5
done

# Check for errors in logs
echo "🔍 Checking for console errors..."
if grep -iE "error:|failed to|cannot find|module not found|Failed to resolve import" /tmp/vite-health-check.log; then
  echo "❌ Console errors detected"
  cat /tmp/vite-health-check.log
  exit 1
fi

echo "✅ No console errors detected"
echo "✅ Dev server health check passed!"
exit 0
```

**Why This Matters:**
- In Story 1.3, we had a case where build/lint/tsc all passed but dev server showed import errors
- This check catches those runtime issues before they reach PR review

---

## Task Completion Protocol

### Critical Rule
**You MUST commit after completing each task before moving to the next task.**

Never batch multiple tasks into one commit unless explicitly instructed.

### Correct Flow

```
1. Mark task as in_progress
2. Work on task (write code, modify files)
3. Test (if applicable)
4. Verify task is complete
5. **COMMIT** with descriptive message
6. Mark task as completed in TodoWrite
7. Move to next task
```

### Incorrect Flow (❌ Don't Do This)

```
1. Work on task
2. Mark task as completed
3. Work on next task
4. Commit both tasks together ❌
```

### Commit Timing

**When to Commit:**
- ✅ After completing each task
- ✅ After fixing a bug
- ✅ After adding a feature
- ✅ Before switching tasks
- ✅ Before creating a PR

**When NOT to Commit:**
- ❌ In the middle of a task (unless it's a logical sub-step)
- ❌ With failing tests
- ❌ With unresolved errors
- ❌ With incomplete work

### Commit Checklist

Before every commit:
- [ ] Code is working
- [ ] Tests pass (if applicable)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Code is formatted
- [ ] Commit message follows format
- [ ] Task is actually complete

---

## PR Creation & Review

### PR Title Format
```
Story X.Y: Story Title
```

### PR Body Template
```markdown
## Summary
Brief description of what this story implements.

### Features Implemented
- ✅ Feature 1
- ✅ Feature 2
- ✅ Feature 3

### Components Created
- Component 1 - description
- Component 2 - description

### Technical Highlights
**Category 1:**
- Detail 1
- Detail 2

**Category 2:**
- Detail 1
- Detail 2

### Test Coverage
- **N tests passing** across M test files
- Description of test coverage

### Validation
✅ All tests passing (N/N)
✅ Dev server health check passed
✅ Production build successful
✅ ESLint passed
✅ TypeScript passed
✅ Pre-commit hooks passed

### Commits
- List of commit messages

## Test Plan
- [x] Test item 1
- [x] Test item 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Before Creating PR

1. Run full pre-PR validation: `npm run pre-pr:frontend`
2. Ensure all tests pass
3. Verify dev server runs without errors
4. Check production build succeeds
5. Review all commits
6. Update story document status to "Ready for Review"

### Creating the PR

```bash
git push -u origin story/X.Y-story-name
gh pr create --title "Story X.Y: Story Title" --body "$(cat PR_BODY)"
```

### After PR Approval

```bash
gh pr merge N --squash --delete-branch
git checkout main
git pull origin main
```

---

## Testing Strategy

### Unit Tests (Vitest)

**File Naming:** `ComponentName.test.tsx` or `module.test.ts`

**Test Structure:**
```typescript
describe('ComponentName', () => {
  describe('Feature Group', () => {
    it('does specific thing', () => {
      // Test implementation
    });
  });
});
```

**Coverage Goals:**
- All components have unit tests
- All helper functions have tests
- Happy path and edge cases covered
- Async operations tested with waitFor

### Integration Tests

- Verify components work together
- Test full user flows
- Validate routing and navigation
- Test data flow

### Test Commands

```bash
npm test              # Run tests in watch mode
npm test -- --run     # Run tests once (for CI/PR)
npm test -- --coverage # Generate coverage report
```

---

## Story Development Lifecycle

### 1. Story Creation

1. Read Epic document for context
2. Create story document in `docs/stories/`
3. Define acceptance criteria
4. Break down into tasks
5. Commit story document to main
6. Create feature branch

### 2. Implementation

1. Create todo list with all tasks
2. For each task:
   - Mark as in_progress
   - Implement the task
   - Write tests (if applicable)
   - Run tests
   - **COMMIT** with task description
   - Mark as completed
   - Move to next task

### 3. Validation

1. Run all tests: `npm test -- --run`
2. Run dev server health check
3. Run full pre-PR validation
4. Fix any issues
5. Update story status to "Ready for Review"
6. Commit status update

### 4. PR & Review

1. Push branch to origin
2. Create PR with detailed description
3. Address review feedback
4. Get approval
5. Merge to main (squash)
6. Pull main locally
7. Delete local feature branch

---

## Code Quality Standards

### TypeScript

- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Explicit return types on functions
- Use `interface` for object shapes
- Use `type` for unions
- Use `type` imports for type-only imports

### React

- Functional components only
- Named exports (not default except App)
- TypeScript interfaces for all props
- Event handlers prefixed with `handle`
- Use hooks appropriately

### Styling

- TailwindCSS utility classes
- Mobile-first responsive design
- Use `cn()` helper for conditional classes
- Consistent spacing scale
- Semantic color names

### File Organization

```
src/
├── components/
│   ├── layout/       # Layout components (Container, Navigation, etc.)
│   └── ui/           # shadcn UI components
├── pages/            # Page components (one per route)
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
├── data/             # Mock data and data access functions
└── hooks/            # Custom React hooks
```

---

## Environment Setup

### Required Tools

- Node.js 18+ (LTS recommended)
- npm 9+
- Git
- GitHub CLI (`gh`)

### Initial Setup

```bash
# Clone repo
git clone <repo-url>
cd portfolio-bmad

# Install dependencies
npm install
cd frontend && npm install

# Setup Husky hooks
cd ..
npm run prepare

# Verify setup
cd frontend
npm run dev    # Should start on localhost:5173
npm test       # Should run tests
npm run build  # Should build successfully
```

---

## Troubleshooting

### Pre-commit Hook Fails

**Issue:** Husky pre-commit fails with permission error

**Solution:**
```bash
chmod +x .husky/pre-commit
```

### Dev Server Health Check Fails

**Issue:** Port 5173 already in use

**Solution:**
```bash
lsof -ti:5173 | xargs kill -9
```

### TypeScript Errors in Tests

**Issue:** Import errors in test files

**Solution:** Use type-only imports:
```typescript
import type { ComponentProps } from 'react';
```

### Lint-Staged Skips Files

**Issue:** "No staged files matching configured tasks"

**Solution:** This is expected when committing non-frontend/backend files (like markdown). The hook will still succeed.

---

## Future Improvements to Track

### Loading States Enhancement (Story TBD)
- Replace spinner with progress bar that fills
- Add skeleton screens for content loading
- More sophisticated loading states
- Smoother transitions

**Status:** Noted for future story (Epic 2 or later)

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2025-10-08 | Initial process documentation created | Dev Agent (Claude) |
| 2025-10-08 | Added branch protection rules | Dev Agent (Claude) |
| 2025-10-08 | Added dev server health check | Dev Agent (Claude) |
| 2025-10-08 | Added task completion protocol | Dev Agent (Claude) |
