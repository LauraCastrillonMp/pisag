import { test, expect } from '@playwright/test';

test.describe('Forum Flow', () => {
  test('should display forum threads', async ({ page }) => {
    await page.goto('/foros');
    
    await page.waitForSelector('article, .thread-card, [data-testid="thread"]', {
      timeout: 10000,
    });
    
    const threads = await page.locator('article, .thread-card').count();
    expect(threads).toBeGreaterThan(0);
  });

  test('should open thread detail', async ({ page }) => {
    await page.goto('/foros');
    
    await page.waitForTimeout(2000);
    
    const firstThread = page.locator('article, .thread-card').first();
    if (await firstThread.isVisible()) {
      await firstThread.click();
      await expect(page).toHaveURL(/\/foros\/.+/);
    }
  });
});