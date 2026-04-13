import { test, devices } from '@playwright/test';
import { SauceMobilePage } from '../../pages/SauceMobilePage';
const android = devices['Pixel 5'];
test.describe('SauceDemo Mobile Automation (Stable)', () => {
  test('Mobile Flow - Login + Menu + Add to Cart', async ({ browser }) => {
    const context = await browser.newContext({
      ...android
    });
    // const testDevices = [
    //   {
    //     name: 'Android Pixel 5', config: android},
    //     name: 'iOS iPhone12', config: iPhone
    //   }
    // ]
    // testDevices.forEach(device =>
    // {
    //   test(`Test on ${device.name}`, async ({browser}) =>
    //   {
    //     const context = await browser.newContext({...devices.config})
    //   }
    // }
    // )
    const page = await context.newPage();
    const app = new SauceMobilePage(page);
    // Navigate
    await app.goto();
    // Login
    await app.login('standard_user', 'secret_sauce');
    await app.takeScreenshot('login_success.png');
    // 🍔 Open menu
    await app.openMenu();
    await app.takeScreenshot('menu_open.png');
    // ❗ IMPORTANT: close menu before next action
    await app.closeMenuIfOpen();
    // Add product
    await app.addProductToCart();
    await app.takeScreenshot('add_to_cart.png');
    await context.close();
  });
});