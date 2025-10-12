import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('resume page loads and displays content', async ({ page }) => {
    await page.goto('/resume');

    // Page should load
    await expect(page).toHaveURL('/resume');

    // Should have resume content (headings for sections)
    await expect(
      page.getByRole('heading', { name: /experience/i })
    ).toBeVisible();
  });

  test('download PDF button is present and functional', async ({ page }) => {
    await page.goto('/resume');

    // Find download button
    const downloadButton = page.getByRole('link', { name: /download pdf/i });
    await expect(downloadButton).toBeVisible();

    // Verify it's a link to PDF
    const href = await downloadButton.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('terminal typing animation is present', async ({ page }) => {
    await page.goto('/resume');

    // Should show name (first thing typed)
    await expect(page.getByRole('heading', { name: /matt hulme/i })).toBeVisible({
      timeout: 10000, // Give time for animation
    });
  });

  test('can skip typing animation by clicking', async ({ page }) => {
    await page.goto('/resume');

    // Wait a moment for animation to start
    await page.waitForTimeout(500);

    // Click anywhere on the page to skip
    await page.click('body');

    // All content should appear quickly
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible({
      timeout: 2000,
    });
    await expect(page.getByRole('heading', { name: /technical skills/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /education/i })).toBeVisible();
  });

  test('all resume sections are present', async ({ page }) => {
    await page.goto('/resume');

    // Click multiple times to ensure animation is skipped
    await page.click('body');
    await page.waitForTimeout(500);
    await page.click('body');

    // Wait for content to appear
    await page.waitForTimeout(3000);

    // Verify Experience section is present (first section)
    const hasExperience = await page.getByRole('heading', { name: /experience/i }).isVisible({ timeout: 10000 });
    expect(hasExperience).toBeTruthy();

    // Verify we have some content (job titles)
    const jobTitles = await page.locator('h3').count();
    expect(jobTitles).toBeGreaterThan(0);

    // Verify Education appears (last section - if this is visible, all content loaded)
    const hasEducation = await page.getByText(/education/i).first().isVisible({ timeout: 10000 });
    expect(hasEducation).toBeTruthy();
  });

  test('contact links are present and clickable', async ({ page }) => {
    await page.goto('/resume');

    // Click to skip animation
    await page.click('body');
    await page.waitForTimeout(500);

    // Check for contact links (email, LinkedIn, GitHub)
    const emailLink = page.getByRole('link', { name: /email|matt/i }).first();
    await expect(emailLink).toBeVisible();

    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toBeVisible();

    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toBeVisible();
  });

  test('resume content is readable and formatted', async ({ page }) => {
    await page.goto('/resume');

    // Skip animation
    await page.click('body');
    await page.waitForTimeout(1000);

    // Wait for experience section to fully load
    await page.waitForSelector('section h3', { timeout: 10000 });

    // Check that experience section has job listings
    const experienceSection = page.locator('section').filter({ hasText: /experience/i });
    const jobTitles = await experienceSection.locator('h3').count();

    // Should have at least one job listed
    expect(jobTitles).toBeGreaterThan(0);
  });
});
