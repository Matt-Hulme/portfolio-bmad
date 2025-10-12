import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigation between routes works correctly', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Navigate to Projects
    await page.getByRole('link', { name: /projects/i }).click();
    await expect(page).toHaveURL('/projects');

    // Navigate to Resume
    await page.getByRole('link', { name: /resume/i }).click();
    await expect(page).toHaveURL('/resume');

    // Navigate back to Home
    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('active route is visually indicated in navigation', async ({ page }) => {
    // Go to home
    await page.goto('/');

    // Home link should have active styling (text-primary class)
    const homeLink = page.getByRole('link', { name: /home/i });
    await expect(homeLink).toHaveClass(/text-primary/);

    // Navigate to resume
    await page.getByRole('link', { name: /resume/i }).click();

    // Resume link should now be active
    const resumeLink = page.getByRole('link', { name: /resume/i });
    await expect(resumeLink).toHaveClass(/text-primary/);
  });

  test('browser back/forward buttons work', async ({ page }) => {
    await page.goto('/');

    // Navigate to resume
    await page.getByRole('link', { name: /resume/i }).click();
    await expect(page).toHaveURL('/resume');

    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/');

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL('/resume');
  });

  test('direct URL navigation works', async ({ page }) => {
    // Navigate directly to resume
    await page.goto('/resume');
    await expect(page).toHaveURL('/resume');

    // Page should load correctly
    await expect(page.getByText(/experience|education|skills/i)).toBeVisible();
  });

  test('refreshing on route maintains correct page', async ({ page }) => {
    // Navigate to resume
    await page.goto('/resume');
    await expect(page).toHaveURL('/resume');

    // Reload page
    await page.reload();

    // Should still be on resume page
    await expect(page).toHaveURL('/resume');
    await expect(page.getByText(/experience|education|skills/i)).toBeVisible();
  });

  test('404 page handles invalid routes', async ({ page }) => {
    // Navigate to non-existent route
    await page.goto('/this-page-does-not-exist');

    // Wait for page to load (lazy loading)
    await page.waitForLoadState('networkidle');

    // Should show 404 page
    await expect(page.getByText(/404|not found/i).first()).toBeVisible();
  });
});
