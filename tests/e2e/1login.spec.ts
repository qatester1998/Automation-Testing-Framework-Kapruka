// tests/session-demo.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Session Reuse Demo (Only Positive)', () => {

  test('User already logged in', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Cookies exist', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const cookies = await page.context().cookies();
    expect(cookies.length).toBeGreaterThan(0);
  });

  test('Session persists', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});
//for git
  