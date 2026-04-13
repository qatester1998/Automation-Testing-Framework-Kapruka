import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Kapruka Login Feature', () => {

  test('Valid user should login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Step 1: Navigate
    await loginPage.goto();

    // Step 2: Validate page loaded
    await loginPage.isLoaded();

    // Step 3: Login
    await loginPage.login(
      process.env.TEST_EMAIL || '@gmail.com',
      process.env.TEST_PASSWORD || 'Admin123'
    );

    
  });

 

});