import { test, expect } from '../../fixtures/fixtures';

test('Get first product using fixture', async ({ comboPage }) => {

  const name = await comboPage.getFirstProductName();
  const price = await comboPage.getFirstProductPrice();

  console.log(name, price);

  expect(name).toBeTruthy();
  expect(price).toBeTruthy();
});