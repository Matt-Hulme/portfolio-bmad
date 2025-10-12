# Story 4.3: Playwright E2E Test Suite - Filtering & Interactions

**Epic:** Epic 4 - Production Deployment & Quality Assurance
**Status:** Not Started
**Branch:** `story/4.3-e2e-tests-filtering`

## User Story

**As a** developer,
**I want** E2E tests for filtering and interactive features,
**so that** dynamic functionality is thoroughly validated.

## Context

This story builds on Story 4.2 (Core Flows) to test the project filtering system - a key interactive feature of the portfolio. These tests ensure the filtering logic, UI interactions, and URL persistence work correctly.

## Acceptance Criteria

### Technology Filter Tests
- [ ] Test: Technology filter dropdown displays all available technologies
- [ ] Test: Selecting a technology filter updates grid to show only matching projects
- [ ] Test: Technology filter shows correct count of projects
- [ ] Test: Selecting multiple technologies works (if implemented)
- [ ] Test: Deselecting a technology updates grid correctly

### Role Filter Tests
- [ ] Test: Role filter dropdown displays all available roles
- [ ] Test: Selecting a role filter updates grid to show only matching projects
- [ ] Test: Role filter shows correct count of projects
- [ ] Test: Selecting multiple roles works (if implemented)
- [ ] Test: Deselecting a role updates grid correctly

### Combined Filter Tests
- [ ] Test: Applying both technology AND role filters works correctly (AND logic)
- [ ] Test: Combined filters show correct intersection of results
- [ ] Test: Filters can be applied in any order
- [ ] Test: Changing one filter while other is active updates correctly

### Clear Filters Tests
- [ ] Test: "Clear filters" button resets grid to show all projects
- [ ] Test: Clear filters button only visible when filters are active
- [ ] Test: Clearing filters resets URL parameters

### Empty State Tests
- [ ] Test: "No projects match" message displays when filters return empty results
- [ ] Test: Empty state provides helpful message
- [ ] Test: Empty state allows user to clear filters

### URL Persistence Tests
- [ ] Test: Filter state persists in URL parameters
- [ ] Test: Sharing filtered URL loads with correct filters applied
- [ ] Test: Browser back button restores previous filter state
- [ ] Test: Refreshing page maintains filter state from URL

### Keyboard Navigation Tests
- [ ] Test: Tab key navigates through filter controls
- [ ] Test: Enter key opens/closes filter dropdowns
- [ ] Test: Arrow keys navigate within dropdown options
- [ ] Test: Escape key closes filter dropdown
- [ ] Test: Space bar selects/deselects options

### Resume Page Tests
- [ ] Test: Resume page displays correctly
- [ ] Test: "Download PDF" button triggers download
- [ ] Test: PDF download works correctly (file downloaded)

## Technical Implementation

### Test Structure
```
frontend/e2e/
├── filters-technology.spec.ts    # Technology filter tests
├── filters-role.spec.ts          # Role filter tests
├── filters-combined.spec.ts      # Combined filter tests
├── filters-url-persistence.spec.ts # URL state tests
├── filters-keyboard.spec.ts      # Keyboard navigation tests
├── resume-download.spec.ts       # Resume page tests
└── helpers/
    ├── filter-helpers.ts        # Filter test utilities
    └── test-data.ts             # Test data
```

### Example Tests

**Technology Filter Test:**
```typescript
test('technology filter updates project grid', async ({ page }) => {
  await page.goto('/');

  // Select React filter
  await page.click('[data-testid="tech-filter"]');
  await page.click('text="React"');

  // Verify only React projects shown
  const projects = await page.locator('[data-testid="project-card"]').all();
  expect(projects.length).toBeGreaterThan(0);

  // Verify all visible projects have React tag
  for (const project of projects) {
    await expect(project.locator('text="React"')).toBeVisible();
  }
});
```

**Combined Filters Test:**
```typescript
test('combined filters show correct results', async ({ page }) => {
  await page.goto('/');

  // Apply React filter
  await page.click('[data-testid="tech-filter"]');
  await page.click('text="React"');

  // Apply Frontend role filter
  await page.click('[data-testid="role-filter"]');
  await page.click('text="Frontend"');

  // Verify results have BOTH React AND Frontend
  const projects = await page.locator('[data-testid="project-card"]').all();
  for (const project of projects) {
    await expect(project.locator('text="React"')).toBeVisible();
    await expect(project.locator('text="Frontend"')).toBeVisible();
  }
});
```

**URL Persistence Test:**
```typescript
test('filter state persists in URL', async ({ page }) => {
  await page.goto('/');

  // Apply filters
  await page.click('[data-testid="tech-filter"]');
  await page.click('text="React"');

  // Check URL updated
  expect(page.url()).toContain('tech=React');

  // Refresh page
  await page.reload();

  // Verify filter still applied
  await expect(page.locator('[data-testid="tech-filter"]')).toContainText('React');
  const projects = await page.locator('[data-testid="project-card"]').all();
  expect(projects.length).toBeGreaterThan(0);
});
```

**Keyboard Navigation Test:**
```typescript
test('keyboard navigation works for filters', async ({ page }) => {
  await page.goto('/');

  // Tab to filter
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab'); // Navigate to filter

  // Open with Enter
  await page.keyboard.press('Enter');
  await expect(page.locator('[role="listbox"]')).toBeVisible();

  // Navigate with arrows
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter'); // Select

  // Verify filter applied
  const url = new URL(page.url());
  expect(url.searchParams.get('tech')).toBeTruthy();
});
```

**PDF Download Test:**
```typescript
test('resume PDF downloads', async ({ page }) => {
  await page.goto('/resume');

  // Setup download listener
  const downloadPromise = page.waitForEvent('download');

  // Click download button
  await page.click('text="Download PDF"');

  // Verify download started
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('Resume');
  expect(download.suggestedFilename()).toContain('.pdf');
});
```

## Prerequisites

### Before Starting
- [ ] Story 4.2 (E2E Core Flows) complete
- [ ] Backend running with test data
- [ ] Frontend dev server running
- [ ] At least 7 projects with varied technologies and roles

## Testing Strategy

### Filter Logic to Test
1. **Single filter:** One technology OR one role
2. **Multiple selections:** Multiple technologies OR multiple roles
3. **Combined filters:** Technology AND role together
4. **Clear state:** Reset to show all projects
5. **Empty results:** Filters that match zero projects
6. **URL sync:** Filters match URL parameters

### Edge Cases
- Selecting then deselecting same filter
- Applying filters in different orders
- URL with invalid filter values
- Refreshing with filters active
- Back button navigation with filters

## Running Tests

```bash
# Run all filtering tests
npx playwright test e2e/filters-*.spec.ts

# Run specific filter test
npx playwright test e2e/filters-combined.spec.ts

# Debug filter tests
npx playwright test e2e/filters-technology.spec.ts --debug
```

## Definition of Done

- [ ] All acceptance criteria tests written
- [ ] All tests passing consistently (3+ runs)
- [ ] Filter logic thoroughly tested (single, multiple, combined)
- [ ] URL persistence verified
- [ ] Keyboard navigation works
- [ ] Empty states tested
- [ ] Resume page download tested
- [ ] Test documentation clear

## Dependencies

**Requires:**
- Story 4.2: E2E Test Suite - Core Flows (Complete)

**Enables:**
- Story 4.5: Production Deployment (needs all tests passing)

## Notes

- Build on test helpers from Story 4.2
- Use consistent test data (same 7 projects)
- Filter implementation uses URL search params
- Clear filters should reset to "/" route
- Empty state should guide users to clear filters

## Success Metrics

- ✅ All filter combinations tested
- ✅ URL persistence works correctly
- ✅ Keyboard accessibility verified
- ✅ Edge cases handled gracefully
- ✅ Tests run fast (< 30 seconds for all filter tests)
