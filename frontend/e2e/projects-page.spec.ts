import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('loads and displays projects heading', async ({ page }) => {
    // Verify page loaded
    await expect(page).toHaveURL('/projects');
    await expect(page).toHaveTitle(/Matt Hulme/i);

    // Verify main heading
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('displays hero section with description', async ({ page }) => {
    // Check for intro text
    await expect(
      page.getByText(/A showcase of diverse projects/i)
    ).toBeVisible();
  });

  test('displays project grid with all 7 projects', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', {
      timeout: 10000,
    });

    // Wait for loading state to complete
    await page.waitForTimeout(1000);

    // Count project cards
    const cardsCount = await page.locator('[data-testid="project-card"]').count();

    // Should have at least 7 projects displayed
    expect(cardsCount).toBeGreaterThanOrEqual(7);

    // Verify first 7 cards are visible and have content
    const cards = await page.locator('[data-testid="project-card"]').all();
    for (let i = 0; i < Math.min(7, cards.length); i++) {
      await expect(cards[i]).toBeVisible();
      const title = await cards[i].locator('h3, h2').textContent();
      expect(title).toBeTruthy();
    }
  });

  test('project cards display correct information', async ({ page }) => {
    // Wait for cards to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });

    const firstCard = page.locator('[data-testid="project-card"]').first();
    await expect(firstCard).toBeVisible();

    // Should have a title (h3 or h2)
    await expect(firstCard.locator('h3, h2')).toBeVisible();

    // Should have technology badges
    const techBadges = firstCard.locator('[data-testid="technology-badge"]');
    expect(await techBadges.count()).toBeGreaterThan(0);
  });

  test('can click on project card to open modal', async ({ page }) => {
    // Wait for cards to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });

    // Click first project card
    await page.locator('[data-testid="project-card"]').first().click();

    // Modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Modal should have content
    const modalText = await modal.textContent();
    expect(modalText).toBeTruthy();
    expect(modalText!.length).toBeGreaterThan(50);
  });
});
