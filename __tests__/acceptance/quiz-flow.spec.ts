import { test, expect } from '@playwright/test';

test.describe('Quiz Flow', () => {
  test('should display knowledge sections', async ({ page }) => {
    await page.goto('/conocimiento');
    
    await page.waitForSelector('[data-testid="section-card"], .section-card, article', {
      timeout: 10000,
    });
    
    const sections = await page.locator('[data-testid="section-card"], .section-card, article').count();
    expect(sections).toBeGreaterThan(0);
  });

  test('should navigate to section detail', async ({ page }) => {
    await page.goto('/conocimiento');
    
    await page.waitForTimeout(2000);
    
    const firstSection = page.locator('[data-testid="section-card"], .section-card, article').first();
    if (await firstSection.isVisible()) {
      await firstSection.click();
      await expect(page).toHaveURL(/\/conocimiento\/.+/);
    }
  });
});