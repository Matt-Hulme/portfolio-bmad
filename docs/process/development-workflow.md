# Development Workflow & Process

This document defines the core development workflow and process. It is **technology-agnostic** and applies to any project regardless of tech stack.

For tech-specific setup (pre-commit hooks, linting, formatting, etc.), see the project's tech-specific documentation.

---

## ⚠️ CRITICAL: Read This First

**Before starting ANY story, you MUST:**

1. Read this entire workflow document
2. Create a feature branch FIRST: `git checkout -b story/X.Y-story-name`
3. Commit after EACH task (not at the end)
4. Follow the Task Completion Protocol below

**If you skip these steps, the PR will be rejected and redone.**

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

## Automated Quality Checks

### Pre-Commit Checks (Required)

**Purpose:** Catch errors before they enter version control

**What Runs:**
- Code formatting validation
- Linting
- Type checking
- Fast, staged-file-only checks

**When It Runs:** Automatically before every `git commit`

**Configuration:** See project-specific documentation for:
- Which tools are used (Prettier, ESLint, Black, Ruff, etc.)
- How to configure pre-commit hooks
- How to bypass checks (emergency only)

**Expected Behavior:**
- ✅ Auto-fixes minor issues when possible
- ✅ Blocks commit if unfixable errors found
- ✅ Provides clear error messages for manual fixes

### Pre-Push Checks (Required)

**Purpose:** Comprehensive validation before code reaches remote

**What Runs:**
- All tests
- Full build validation
- Complete linting
- Full type checking
- Any project-specific health checks

**When It Runs:** Automatically before every `git push`

**Configuration:** See project-specific documentation for specific commands

**Expected Behavior:**
- ✅ Runs full test suite
- ✅ Validates production builds work
- ✅ Ensures no broken code reaches the remote repository
- ✅ Blocks push if any checks fail

### Pre-PR Validation (Required)

**Purpose:** Final comprehensive check before creating a pull request

**What Runs:**
- Everything from pre-push checks
- Any additional project-specific validations
- Documentation checks
- Coverage reports (if applicable)

**When to Run:**
- Before creating a PR
- After completing all tasks in a story
- Before requesting review

**How to Run:** See project-specific documentation for the exact command

---

## 🚨 Task Completion Protocol (MANDATORY)

### CRITICAL RULE - READ THIS

**You MUST commit after completing EACH task before moving to the next task.**

This is NOT optional. This is NOT a suggestion. This is MANDATORY.

### Why This Matters

1. **Code Review** - Easier to review 5 focused commits than 1 giant blob
2. **History** - Clear progression shows how the feature was built
3. **Debugging** - Can revert or bisect specific changes
4. **Accountability** - Shows incremental progress
5. **Standards** - This is how professional teams work

### ✅ CORRECT Flow (Follow This Exactly)

```
BEFORE STARTING:
0. Read this entire document
1. Create feature branch: git checkout -b story/X.Y-story-name
2. Create task list with all tasks (using TodoWrite or similar)

FOR EACH TASK:
3. Mark task as in_progress
4. Work on task (write code, modify files)
5. Test (if applicable)
6. Verify task is complete
7. **GIT ADD + GIT COMMIT** with descriptive message ⭐ MANDATORY ⭐
   - Pre-commit checks will run automatically
   - Fix any issues before proceeding
8. Mark task as completed
9. Move to next task

AFTER ALL TASKS:
10. Run pre-PR validation (see project docs for command)
11. Push branch: git push -u origin story/X.Y-story-name
    - Pre-push checks will run automatically
12. Create PR with gh pr create
```

### ❌ INCORRECT Flow (Never Do This)

```
❌ Work on multiple tasks
❌ Mark all as completed
❌ Commit everything at once
❌ Create PR with 1 giant commit
```

**If you do this, the PR WILL BE REJECTED and you will redo it properly.**

### Commit Timing - When to Commit

**ALWAYS Commit After:**
- ✅ Completing each task (MANDATORY)
- ✅ Creating a new component/module
- ✅ Adding a new feature
- ✅ Fixing a bug
- ✅ Writing tests
- ✅ Before switching tasks
- ✅ Before creating a PR

**NEVER Commit:**
- ❌ In the middle of a task (unless it's a logical sub-step)
- ❌ With failing tests
- ❌ With unresolved errors
- ❌ With incomplete work
- ❌ Multiple completed tasks at once

### Pre-Commit Checklist (Before EVERY Commit)

Before you run `git commit`:
- [ ] This commit represents ONE completed task
- [ ] Code is working
- [ ] Tests pass (if applicable)
- [ ] No compilation/type errors
- [ ] No linting errors
- [ ] Code is properly formatted
- [ ] Commit message follows format
- [ ] Task is actually complete
- [ ] NOT bundling multiple tasks

### Example: Correct Commit History

```bash
# Start
git checkout -b story/2.3-feature-name

# Task 1: Create data models
# ... work on task ...
git add <relevant files>
git commit -m "Add data models for feature X"
# Pre-commit checks run automatically ✅

# Task 2: Create business logic
# ... work on task ...
git add <relevant files>
git commit -m "Add business logic for feature X"
# Pre-commit checks run automatically ✅

# Task 3: Create API endpoints
# ... work on task ...
git add <relevant files>
git commit -m "Add API endpoints for feature X"
# Pre-commit checks run automatically ✅

# Task 4: Add tests
# ... work on task ...
git add <relevant files>
git commit -m "Add comprehensive tests for feature X"
# Pre-commit checks run automatically ✅

# Before creating PR
npm run pre-pr  # or whatever your project's command is

# Create PR
git push -u origin story/2.3-feature-name
# Pre-push checks run automatically ✅
gh pr create ...
```

This creates **4 commits** showing the logical progression of work.

### Example: What NOT To Do

```bash
# ❌ WRONG - Everything in one commit
git checkout -b story/2.3-feature-name
# ... create models, logic, endpoints, tests ...
git add .
git commit -m "Story 2.3: Feature Name"  # ❌ BAD - bundles 4 tasks
```

This creates **1 commit** that bundles everything together. **DO NOT DO THIS.**

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
✅ Build successful
✅ Linting passed
✅ Type checking passed
✅ Pre-commit hooks passed
✅ Pre-push checks passed

### Commits
- Commit 1: Description
- Commit 2: Description
- Commit 3: Description
- Commit 4: Description

## Test Plan
- [x] Test item 1
- [x] Test item 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Before Creating PR

1. **Verify you have MULTIPLE commits** (not one giant commit)
2. Run full pre-PR validation (see project docs for command)
3. Ensure all tests pass
4. Verify builds succeed
5. Review all commits
6. Update story document status to "Ready for Review"

### Creating the PR

```bash
git push -u origin story/X.Y-story-name
# Pre-push checks run automatically

gh pr create --title "Story X.Y: Story Title" --body "$(cat PR_BODY)"
```

### After PR Approval

```bash
gh pr merge N --squash --delete-branch
git checkout main
git pull origin main
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

### 2. Implementation (FOLLOW THIS EXACTLY)

1. **Create feature branch FIRST**: `git checkout -b story/X.Y-story-name`
2. Create task list with all tasks
3. **For EACH task:**
   - Mark as in_progress
   - Implement the task
   - Write tests (if applicable)
   - Run tests
   - **COMMIT** with task description ⭐ MANDATORY ⭐
   - Pre-commit checks run automatically
   - Fix any issues before proceeding
   - Mark as completed
   - Move to next task

### 3. Validation

1. Run all tests (see project docs)
2. Run pre-PR validation (see project docs)
3. Fix any issues
4. Update story status to "Ready for Review"
5. Commit status update

### 4. PR & Review

1. Push branch to origin
   - Pre-push checks run automatically
2. Create PR with detailed description (including commit list)
3. Address review feedback
4. Get approval
5. Merge to main (squash)
6. Pull main locally
7. Delete local feature branch

---

## Quality Gates

### Commit-Level Gate (Automated)
- **Pre-commit checks** run on every commit
- Must pass before commit is allowed
- Catches formatting, linting, basic type errors

### Push-Level Gate (Automated)
- **Pre-push checks** run before code reaches remote
- Must pass before push is allowed
- Runs full test suite, builds, comprehensive validation

### PR-Level Gate (Manual)
- **Pre-PR validation** run before creating PR
- Developer verifies all checks pass
- Ensures high quality before requesting review

### Merge-Level Gate (Automated + Manual)
- All automated checks must be green
- Code review approval required
- Squash merge to main maintains clean history

---

## Troubleshooting

### Pre-commit Hook Fails

**Solution:**
1. Read the error message carefully
2. Fix the reported issues
3. Re-stage files: `git add <files>`
4. Try commit again

**Emergency Bypass (Use Sparingly):**
```bash
git commit --no-verify
```
⚠️ Only use this for documentation-only changes or when hooks are genuinely broken

### Pre-push Check Fails

**Solution:**
1. Review the failing check output
2. Fix the issues locally
3. Commit the fixes
4. Try push again

**DO NOT** bypass pre-push checks - they prevent broken code from reaching the repository

### Can't Remember Project Commands

**Solution:**
Check the project's tech-specific documentation for:
- How to run tests
- How to run pre-PR validation
- Which linters/formatters are used
- Tool-specific configuration

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2025-10-08 | Initial process documentation created | Dev Agent (Claude) |
| 2025-10-08 | Added branch protection rules | Dev Agent (Claude) |
| 2025-10-08 | Added task completion protocol | Dev Agent (Claude) |
| 2025-10-10 | Enhanced task completion protocol with MANDATORY commit-per-task rule | Dev Agent (Claude) |
| 2025-10-10 | Removed tech-specific content to keep workflow tech-agnostic | Dev Agent (Claude) |
