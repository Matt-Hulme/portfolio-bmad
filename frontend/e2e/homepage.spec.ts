import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and displays all content', async ({ page }) => {
    await page.goto('/');

    // Verify page loaded
    await expect(page).toHaveTitle(/Matt Hulme/i);

    // Can skip animation by clicking
    await page.click('body');

    // Verify main heading (name)
    await expect(page.locator('h1')).toContainText('Matt Hulme');

    // Verify tagline is present
    await expect(
      page.getByText(/Applied AI Engineer.*Full-Stack Developer/i)
    ).toBeVisible();

    // Verify navigation buttons
    await expect(page.getByRole('link', { name: /view projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view resume/i })).toBeVisible();
  });

  test('can skip typing animation by clicking', async ({ page }) => {
    await page.goto('/');

    // Wait a moment for animation to start
    await page.waitForTimeout(500);

    // Click anywhere on the page to skip
    await page.click('body');

    // All content should appear quickly
    await expect(page.getByText(/Applied AI Engineer/i)).toBeVisible({ timeout: 2000 });
    await expect(page.getByRole('link', { name: /view projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view resume/i })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');

    // Skip animation
    await page.click('body');
    await page.waitForTimeout(500);

    // Click Projects button
    await page.getByRole('link', { name: /view projects/i }).click();
    await expect(page).toHaveURL('/projects');

    // Go back and click Resume button
    await page.goBack();
    await page.click('body'); // Skip animation again
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: /view resume/i }).click();
    await expect(page).toHaveURL('/resume');
  });

  test('navigation links are present in header', async ({ page }) => {
    await page.goto('/');

    // Check navigation exists
    const nav = page.getByRole('navigation', { name: /main navigation/i });
    await expect(nav).toBeVisible();

    // Check for main links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /resume/i })).toBeVisible();
  });
});
