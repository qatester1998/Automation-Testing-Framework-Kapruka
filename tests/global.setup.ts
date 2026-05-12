import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {

  console.log('🚀 Running Global Setup (Saucedemo)...');

  const browser = await chromium.launch({ headless: false });

  // ✅ Create explicit context
  const context = await browser.newContext();
  const page = await context.newPage();

  // 🔐 Login to Saucedemo
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // ✅ Wait for successful login (VERY IMPORTANT)
  await page.waitForURL('**/inventory.html');

  // 🔥 DEBUG: verify cookies exist
  const cookies = await context.cookies();
  console.log('🍪 Cookies after login:', cookies);

  if (cookies.length === 0) {
    throw new Error('❌ No cookies found - login failed');
  }

  // ✅ Save storage state
  const storagePath = path.resolve(__dirname, '../auth.json');
  await context.storageState({ path: storagePath });

  console.log('✅ auth.json created at:', storagePath);
  await page.pause(); // 🔥 Pause to visually confirm login before closing browser

  await browser.close();
}

export default globalSetup;

//browser -> context -> page
//browser - entire browser instance (can have multiple contexts)
//context - isolated environment (like incognito window, can have multiple pages)
//page - single tab within a context (where we interact with the website)