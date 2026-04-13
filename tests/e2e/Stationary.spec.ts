import { test } from '@playwright/test';
import { StationaryPage } from '../../pages/StationaryPage';

test.describe('Stationary Products', () => {

  test('Validate product list using tuples', async ({ page }) => {

    const stationaryPage = new StationaryPage(page);

    await stationaryPage.goto();
    await stationaryPage.isLoaded();

    // Print products
    await stationaryPage.printProducts();

    //  Validate prices
    await stationaryPage.validateProducts();
  });

});