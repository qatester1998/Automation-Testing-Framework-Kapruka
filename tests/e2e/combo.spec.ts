import { test, expect } from '@playwright/test';
import { ComboGiftsPage } from '../../pages/ComboGiftsPage';

test('Get first product name and price', async ({ page }) => {

  //const comboPage = new ComboGiftsPage(page);
    const comboPage = new ComboGiftsPage(page);
  await comboPage.goto();

  const name = await comboPage.getFirstProductName();
  const price = await comboPage.getFirstProductPrice();

  console.log('Product Name:', name);
  console.log('Product Price:', price);

  expect(name).not.toBe('');
  expect(price).not.toBe('');
});