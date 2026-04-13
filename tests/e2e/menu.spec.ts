import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Validate all menu items using switch + array', async ({ page }) => {

  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.isLoaded();

  // ✅ Get all menu items
  const menuList = await homePage.getAllMenuItems();

  console.log('Menu Items:', menuList);

  // ✅ Iterate using array + switch
  for (const menu of menuList) {
    await homePage.handleMenu(menu);
  }
});