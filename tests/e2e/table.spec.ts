import { test } from '@playwright/test';
import { SameDayDeliveryPage } from '../../pages/SameDayDeliveryPage';

test('Validate Same Day Delivery Table', async ({ page }) => {

  const tablePage = new SameDayDeliveryPage(page);

  await tablePage.goto();
  await tablePage.isLoaded();

  
  await tablePage.printTable();

  
  await tablePage.validateProductPrice(
    'Marble Butter Cake',
    '3010'
  );

});