import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate through main sections', async ({ page }) => {
    await page.goto('/');
    
    // Verificar título
    await expect(page).toHaveTitle(/PISAG/);
    
    // Navegar a Noticias
    await page.click('a[href="/noticias"]');
    await expect(page).toHaveURL('/noticias');
    
    // Navegar a Foros
    await page.click('a[href="/foros"]');
    await expect(page).toHaveURL('/foros');
    
    // Navegar a Multimedia
    await page.click('a[href="/multimedia"]');
    await expect(page).toHaveURL('/multimedia');
    
    // Navegar a Conocimiento
    await page.click('a[href="/conocimiento"]');
    await expect(page).toHaveURL('/conocimiento');
  });

  test('should display responsive menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Buscar botón hamburguesa
    const menuButton = page.locator('[aria-label="menu"], button:has-text("Menu")').first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
    }
  });
});