import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Kapruka Currency Dropdown', () => {

  test('Switch from INR to USD', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.isLoaded();

    // Default is INR
    await homePage.verifyCurrency('INR');

    // Change to USD
    await homePage.selectCurrency('USD');

    // Validate
    await homePage.verifyCurrency('USD');
  });


  test('Switch from USD to INR', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.isLoaded();

    await homePage.selectCurrency('USD');
    await homePage.verifyCurrency('USD');

    await homePage.selectCurrency('INR');
    await homePage.verifyCurrency('INR');
  });

});