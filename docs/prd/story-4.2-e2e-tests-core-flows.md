# Story 4.2: Playwright E2E Test Suite - Core Flows

**Epic:** Epic 4 - Production Deployment & Quality Assurance
**Status:** Not Started
**Branch:** `story/4.2-e2e-tests-core`

## User Story

**As a** developer,
**I want** comprehensive E2E tests covering critical user journeys,
**so that** regressions are caught before deployment and core functionality is verified.

## Context

This story implements end-to-end tests using Playwright to verify the critical user journeys work correctly. These tests will run before production deployment to ensure quality.

Playwright is already installed (from Epic 1), so we'll build on that foundation.

## Acceptance Criteria

### Test Infrastructure
- [ ] Playwright configured for E2E testing (already installed)
- [ ] Test helpers and utilities created for common actions
- [ ] CI-ready configuration (can run in headless mode)

### Homepage Tests
- [ ] Test: Homepage loads and displays all content
- [ ] Test: Homepage displays project grid with all 7 projects
- [ ] Test: Hero/intro section visible
- [ ] Test: Navigation links present and functional

### Project Card Tests
- [ ] Test: Project cards display correct data (title, roles, technologies)
- [ ] Test: Project cards have proper thumbnails (or placeholder)
- [ ] Test: Clicking project card opens modal with correct project details
- [ ] Test: Cards are clickable and keyboard accessible

### Project Modal Tests
- [ ] Test: Modal displays full project description
- [ ] Test: Modal shows project links (if present)
- [ ] Test: Modal conditionally shows/hides media section based on data
- [ ] Test: Modal image carousel works (if project has media)
- [ ] Test: Modal closes on Escape key press
- [ ] Test: Modal closes on backdrop click
- [ ] Test: Modal closes on X button click
- [ ] Test: Focus returns to correct card after modal close
- [ ] Test: Modal is keyboard accessible (Tab, Enter, Escape)

### Navigation Tests
- [ ] Test: Navigation between routes (/, /projects, /resume) works correctly
- [ ] Test: Active route is visually indicated in navigation
- [ ] Test: Browser back/forward buttons work
- [ ] Test: Direct URL navigation works (refresh on /resume loads correctly)

### Resume Page Tests
- [ ] Test: Resume page loads and displays content
- [ ] Test: "Download PDF" button present and functional
- [ ] Test: Terminal typing animation completes (or can be skipped)

### Test Quality
- [ ] All E2E tests pass consistently on local development environment
- [ ] Tests are deterministic (no flaky tests)
- [ ] Tests have clear, descriptive names
- [ ] Tests clean up after themselves

## Technical Implementation

### Test Structure
```
frontend/e2e/
├── homepage.spec.ts          # Homepage tests
├── project-cards.spec.ts     # Project card tests
├── project-modal.spec.ts     # Modal interaction tests
├── navigation.spec.ts        # Routing and navigation tests
├── resume.spec.ts           # Resume page tests
└── helpers/
    ├── test-data.ts         # Shared test data
    └── test-utils.ts        # Common test utilities
```

### Example Tests

**Homepage Test:**
```typescript
test('homepage displays all 7 projects', async ({ page }) => {
  await page.goto('/');
  const projectCards = await page.locator('[data-testid="project-card"]').all();
  expect(projectCards).toHaveLength(7);
});
```

**Modal Test:**
```typescript
test('modal closes on Escape key', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="project-card"]').first().click();
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();
});
```

**Navigation Test:**
```typescript
test('active route is visually indicated', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="/"]')).toHaveClass(/text-primary/);

  await page.click('nav a[href="/resume"]');
  await expect(page.locator('nav a[href="/resume"]')).toHaveClass(/text-primary/);
});
```

## Prerequisites

### Before Starting
- [ ] Backend running locally (needed for API tests)
- [ ] Frontend dev server running
- [ ] Playwright installed and configured
- [ ] Test data available (7 projects in database)

## Testing Strategy

### What to Test
- **Critical paths:** Homepage → Project Card → Modal → Close
- **Navigation:** All routes accessible and functional
- **User interactions:** Click, keyboard, escape
- **Data display:** Correct data shown in cards and modal
- **Accessibility:** Keyboard navigation works

### What NOT to Test
- ❌ Visual styling details (use visual regression tests separately if needed)
- ❌ Unit test concerns (already covered by unit tests)
- ❌ API implementation details (test via UI behavior)

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test e2e/project-modal.spec.ts

# Debug mode
npx playwright test --debug
```

## Definition of Done

- [ ] All acceptance criteria tests written
- [ ] All tests passing consistently (3+ runs with no failures)
- [ ] Tests documented with clear descriptions
- [ ] Test helpers created for reusable logic
- [ ] README updated with E2E test instructions
- [ ] Tests can run in CI environment (headless)

## Dependencies

**Requires:**
- Story 4.1: Deployment Infrastructure (Complete)

**Enables:**
- Story 4.3: E2E Test Suite - Filtering
- Story 4.5: Production Deployment (needs tests passing first)

## Notes

- Playwright already installed during Epic 1
- Keep tests fast (< 30 seconds total)
- Use data-testid attributes for stable selectors
- Mock external dependencies if needed (but test real API for now)
- Tests should work with backend running on localhost:8000

## Success Metrics

- ✅ 100% of critical user journeys covered
- ✅ Zero flaky tests
- ✅ Tests complete in < 30 seconds
- ✅ Clear, maintainable test code
