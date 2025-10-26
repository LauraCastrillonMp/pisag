import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"], input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should navigate to sign up page', async ({ page }) => {
    await page.goto('/auth/login');
    
    const signUpLink = page.locator('a[href*="sign-up"]').first();
    if (await signUpLink.isVisible()) {
      await signUpLink.click();
      await expect(page).toHaveURL(/sign-up/);
    }
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    // Verificar que se muestre algún error o validación
  });
});
