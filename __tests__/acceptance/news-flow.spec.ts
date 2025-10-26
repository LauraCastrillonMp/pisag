import { test, expect } from '@playwright/test';

test.describe('News Section Flow', () => {
  test('should display news articles', async ({ page }) => {
    await page.goto('/noticias');
    
    await page.waitForSelector('article, .news-card, [data-testid="news-article"]', {
      timeout: 10000,
    });
    
    const articles = await page.locator('article, .news-card').count();
    expect(articles).toBeGreaterThan(0);
  });

  test('should open news article detail', async ({ page }) => {
    await page.goto('/noticias');
    
    await page.waitForTimeout(2000);
    
    const firstArticle = page.locator('article, .news-card').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      await expect(page).toHaveURL(/\/noticias\/.+/);
    }
  });

  test('should search news articles', async ({ page }) => {
    await page.goto('/noticias');
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('espacio');
      await searchInput.press('Enter');
      await page.waitForTimeout(1000);
    }
  });
});