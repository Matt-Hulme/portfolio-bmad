import { test, expect } from '@playwright/test';

test.describe('Project Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
  });

  test('display correct data (title, roles, technologies)', async ({ page }) => {
    // Get first project card
    const firstCard = page.locator('[data-testid="project-card"]').first();

    // Should have a title
    await expect(firstCard.locator('h3, h2')).toBeVisible();

    // Should display technologies/badges
    const badges = firstCard.locator('[data-testid="technology-badge"]');
    await expect(badges.first()).toBeVisible();
  });

  test('cards are clickable', async ({ page }) => {
    const firstCard = page.locator('[data-testid="project-card"]').first();

    // Card should be clickable
    await expect(firstCard).toBeVisible();

    // Click should open modal
    await firstCard.click();

    // Modal should appear
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('cards are keyboard accessible', async ({ page }) => {
    // Tab to first card (may need multiple tabs depending on layout)
    await page.keyboard.press('Tab');

    // Keep tabbing until we reach a project card
    let attempts = 0;
    while (attempts < 20) {
      const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      if (focused === 'project-card') {
        break;
      }
      await page.keyboard.press('Tab');
      attempts++;
    }

    // Press Enter to open
    await page.keyboard.press('Enter');

    // Modal should open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('clicking card opens modal with correct project details', async ({ page }) => {
    // Get the first visible card's title
    const firstCard = page.locator('[data-testid="project-card"]:visible').first();
    const cardTitle = await firstCard.locator('h3, h2').textContent();

    // Click the card
    await firstCard.click();

    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Modal should have the same title (use .first() to avoid strict mode violation)
    if (cardTitle) {
      await expect(modal.getByRole('heading').first()).toContainText(cardTitle);
    }
  });

  test('all 7 project cards are visible', async ({ page }) => {
    // Wait for loading to complete and cards to be stable
    await page.waitForTimeout(1000);

    // Count visible cards on the screen
    const visibleCardsCount = await page.locator('[data-testid="project-card"]').count();

    // Should have at least 7 cards (application has 7 projects)
    expect(visibleCardsCount).toBeGreaterThanOrEqual(7);

    // Verify that all cards are visible and have content
    const firstSevenCards = await page.locator('[data-testid="project-card"]').all();
    for (let i = 0; i < Math.min(7, firstSevenCards.length); i++) {
      await expect(firstSevenCards[i]).toBeVisible();
      // Each card should have a title
      const title = await firstSevenCards[i].locator('h3, h2').textContent();
      expect(title).toBeTruthy();
    }
  });
});
