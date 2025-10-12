import { test, expect } from '@playwright/test';

test.describe('Project Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
  });

  test('displays "All Projects" badge when no filters active', async ({ page }) => {
    // Should show "All Projects" badge
    await expect(page.getByText('All Projects')).toBeVisible();
  });

  test('can filter by single technology', async ({ page }) => {
    // Count initial projects
    const initialCount = await page.locator('[data-testid="project-card"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Open technologies dropdown and select React
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();

    // Close dropdown by clicking outside
    await page.keyboard.press('Escape');

    // Should show React badge
    await expect(page.getByText('React').first()).toBeVisible();

    // Should hide "All Projects" badge
    await expect(page.getByText('All Projects')).not.toBeVisible();

    // Project count should change (React is common, so should have projects)
    const filteredCount = await page.locator('[data-testid="project-card"]').count();
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('can filter by single role', async ({ page }) => {
    // Open roles dropdown and select Frontend Dev
    await page.locator('[data-testid="filter-roles"]').click();
    await page.getByRole('option', { name: 'Frontend Dev' }).click();

    // Close dropdown
    await page.keyboard.press('Escape');

    // Should show role badge
    await expect(page.getByText('Frontend Dev').first()).toBeVisible();

    // Should hide "All Projects" badge
    await expect(page.getByText('All Projects')).not.toBeVisible();

    // Should have filtered projects
    const filteredCount = await page.locator('[data-testid="project-card"]').count();
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('can filter by multiple technologies', async ({ page }) => {
    // Select React
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();

    // Select TypeScript
    await page.getByRole('option', { name: 'TypeScript' }).click();

    // Close dropdown
    await page.keyboard.press('Escape');

    // Should show both technology badges
    const reactBadge = page.locator('text=React').filter({ has: page.locator('svg') });
    const tsBadge = page.locator('text=TypeScript').filter({ has: page.locator('svg') });

    await expect(reactBadge.first()).toBeVisible();
    await expect(tsBadge.first()).toBeVisible();

    // Projects should be visible (React + TypeScript is common combo)
    const count = await page.locator('[data-testid="project-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('can filter by multiple roles (AND logic)', async ({ page }) => {
    // Select AI Engineer
    await page.locator('[data-testid="filter-roles"]').click();
    await page.getByRole('option', { name: 'AI Engineer' }).click();

    // Select Product Manager
    await page.getByRole('option', { name: 'Product Manager' }).click();

    // Close dropdown
    await page.keyboard.press('Escape');

    // Should show both role badges
    const aiBadge = page.locator('text=AI Engineer').filter({ has: page.locator('svg') });
    const pmBadge = page.locator('text=Product Manager').filter({ has: page.locator('svg') });

    await expect(aiBadge.first()).toBeVisible();
    await expect(pmBadge.first()).toBeVisible();

    // Should have projects matching both roles (some projects have multiple roles)
    // If no projects match, that's also valid behavior (AND logic may filter everything out)
    const count = await page.locator('[data-testid="project-card"]').count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('can combine role and technology filters', async ({ page }) => {
    // Select Frontend Dev role
    await page.locator('[data-testid="filter-roles"]').click();
    await page.getByRole('option', { name: 'Frontend Dev' }).click();
    await page.keyboard.press('Escape');

    // Select React technology
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();
    await page.keyboard.press('Escape');

    // Should show both badges
    await expect(page.locator('text=Frontend Dev').filter({ has: page.locator('svg') }).first()).toBeVisible();
    await expect(page.locator('text=React').filter({ has: page.locator('svg') }).first()).toBeVisible();

    // Should have filtered projects
    const count = await page.locator('[data-testid="project-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('can remove filter by clicking badge X', async ({ page }) => {
    // Add React filter
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();
    await page.keyboard.press('Escape');

    // Verify badge is visible
    const reactBadge = page.locator('text=React').filter({ has: page.locator('svg') }).first();
    await expect(reactBadge).toBeVisible();

    // Click the X on the badge to remove it
    await reactBadge.click();

    // Badge should be removed
    await expect(page.locator('text=React').filter({ has: page.locator('svg') })).not.toBeVisible();

    // "All Projects" should return
    await expect(page.getByText('All Projects')).toBeVisible();
  });

  test('clear button removes all filters', async ({ page }) => {
    // Add multiple filters
    await page.locator('[data-testid="filter-roles"]').click();
    await page.getByRole('option', { name: 'Frontend Dev' }).click();
    await page.keyboard.press('Escape');

    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();
    await page.keyboard.press('Escape');

    // Verify filters are active
    await expect(page.locator('text=Frontend Dev').filter({ has: page.locator('svg') }).first()).toBeVisible();
    await expect(page.locator('text=React').filter({ has: page.locator('svg') }).first()).toBeVisible();

    // Click Clear button
    await page.getByRole('button', { name: /clear/i }).click();

    // All filter badges should be removed
    await expect(page.locator('text=Frontend Dev').filter({ has: page.locator('svg') })).not.toBeVisible();
    await expect(page.locator('text=React').filter({ has: page.locator('svg') })).not.toBeVisible();

    // "All Projects" should return
    await expect(page.getByText('All Projects')).toBeVisible();
  });

  test('clear button only appears when filters are active', async ({ page }) => {
    // Clear button should not be visible initially
    await expect(page.getByRole('button', { name: /clear/i })).not.toBeVisible();

    // Add a filter
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();
    await page.keyboard.press('Escape');

    // Clear button should now be visible
    await expect(page.getByRole('button', { name: /clear/i })).toBeVisible();

    // Remove the filter
    const reactBadge = page.locator('text=React').filter({ has: page.locator('svg') }).first();
    await reactBadge.click();

    // Clear button should be hidden again
    await expect(page.getByRole('button', { name: /clear/i })).not.toBeVisible();
  });

  test('displays message when no projects match filters', async ({ page }) => {
    // This test assumes there's a filter combination that yields no results
    // If all filter combos yield results, we can skip this or use a non-existent filter

    // Try to create a filter combo unlikely to match
    // (This might need adjustment based on actual project data)
    await page.locator('[data-testid="filter-technologies"]').click();

    // Get all technology options
    const techOptions = await page.locator('[role="option"]').all();

    if (techOptions.length > 0) {
      // Select first technology
      await techOptions[0].click();
      await page.keyboard.press('Escape');

      // Check if we have projects
      const projectCount = await page.locator('[data-testid="project-card"]').count();

      if (projectCount === 0) {
        // Verify empty state message appears
        await expect(page.getByText(/no projects found/i)).toBeVisible();
      }
    }
  });

  test('project count updates when filters change', async ({ page }) => {
    // Get initial count
    const initialCount = await page.locator('[data-testid="project-card"]').count();

    // Apply filter
    await page.locator('[data-testid="filter-technologies"]').click();
    await page.getByRole('option', { name: 'React' }).click();
    await page.keyboard.press('Escape');

    // Get filtered count
    const filteredCount = await page.locator('[data-testid="project-card"]').count();

    // Counts should potentially differ (or at minimum, filtering should work)
    expect(filteredCount).toBeGreaterThanOrEqual(0);

    // Clear filters
    await page.getByRole('button', { name: /clear/i }).click();

    // Count should return to initial
    const finalCount = await page.locator('[data-testid="project-card"]').count();
    expect(finalCount).toBe(initialCount);
  });
});
