/**
 * tests/e2e/homepage.spec.ts
 * Test Suite: Home Page
 * Tags: @smoke @regression @homepage
 *
 * Covers:
 *  - TC-001: Homepage loads successfully
 *  - TC-002: Page title is correct
 *  - TC-003: Navigation elements are visible
 *  - TC-004: Search bar is present
 *  - TC-005: Cart icon is visible
 *  - TC-006: Footer is visible
 *  - TC-007: Product cards are rendered
 */


import { test, expect } from '../../fixtures/fixtures'; 
import { logger, logStep } from '../../utils/logger';
import { HomePage } from '../../pages/HomePage'

test.describe('Home Page', () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);   // 
    await homePage.goto();
    await homePage.isLoaded();
  });
  test('TC-001: Homepage loads successfully @smoke @homepage',
    async ({ page }) => {
      logStep('Verify homepage loads and URL is correct');
      await expect(page).toHaveURL(/kapruka\.com/);
      await expect(page).not.toHaveURL(/error|404|500/);
    }
  );
  test('TC-002: Page title contains Kapruka',
    async () => { 
      logStep('Verify page title');
      const title = await homePage.getTitle();
      expect(title.toLowerCase()).toContain('kapruka');
    }
  );
});



/*
test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.isLoaded();
  });

  test('TC-002: Page title contains Kapruka',
    async () => {
      const title = await homePage.getTitle();
      expect(title.toLowerCase()).toContain('kapruka');
    }
  );
});
*/
/*
  // ──────────────────────────────────────────────────────────────────────────
  // TC-001
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-001: Homepage loads successfully @smoke @homepage',
    async ({ homePage, page }) => {
      logStep('Verify homepage loads and URL is correct');

      expect(page.url()).toContain('kapruka.com');
      await expect(page).not.toHaveURL(/error|404|500/);
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-002
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-002: Page title contains "Kapruka" @smoke @homepage',
    async ({ homePage }) => {
      logStep('Verify page title');

      const title = await homePage.getTitle();
      logger.info(`Page title: "${title}"`);

      expect(title.toLowerCase()).toContain('kapruka');
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-003
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-003: Main logo is visible @smoke @homepage',
    async ({ homePage }) => {
      logStep('Verify logo visibility');

      await expect(homePage.logo).toBeVisible();
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-004
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-004: Search bar is visible and enabled @smoke @homepage',
    async ({ homePage }) => {
      logStep('Verify search bar is present and interactable');

      await expect(homePage.searchInput).toBeVisible();
      await expect(homePage.searchInput).toBeEnabled();
      await expect(homePage.searchButton).toBeVisible();
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-005
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-005: Cart icon is visible in the header @smoke @homepage',
    async ({ homePage }) => {
      logStep('Verify cart icon visibility');

      await expect(homePage.cartIcon).toBeVisible();
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-006
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-006: Footer is present on the homepage @regression @homepage',
    async ({ homePage }) => {
      logStep('Scroll to footer and verify visibility');

      await homePage.scrollToBottom();
      await expect(homePage.footer).toBeVisible();
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-007
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-007: Product cards are rendered on the homepage @regression @homepage',
    async ({ homePage }) => {
      logStep('Verify at least one product card is displayed');

      await homePage.scrollToFeaturedProducts();

      const count = await homePage.productCards.count();
      logger.info(`Product cards found: ${count}`);

      expect(count).toBeGreaterThan(0);
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TC-008
  // ──────────────────────────────────────────────────────────────────────────
  test(
    'TC-008: Login and Register links are present @regression @homepage',
    async ({ homePage }) => {
      logStep('Verify auth navigation links');

      await expect(homePage.loginLink).toBeVisible();
      await expect(homePage.registerLink).toBeVisible();
    }
  );
});
*/
