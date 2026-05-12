import { test as base, Page } from '@playwright/test';
import { ComboGiftsPage } from '../pages/ComboGiftsPage';
import { ShadowDomPage } from '../pages/ShadowDomPage';
import fs from 'fs';
import path from 'path';

type MyFixtures = {
  comboPage: ComboGiftsPage;
  shadowPage: ShadowDomPage;
};

// 🔹 Helper to restore sessionStorage
async function restoreSessionStorage(page: Page) {
  const sessionPath = path.resolve(__dirname, '../fixtures/auth/session-storage.json');

  if (!fs.existsSync(sessionPath)) return;

  const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf-8'));

  await page.addInitScript((data) => {
    for (const key in data) {
      window.sessionStorage.setItem(key, data[key]);
    }
  }, sessionData);
}

export const test = base.extend<MyFixtures>({

  //Inject session BEFORE any page usage
  page: async ({ page }, use) => {
    await restoreSessionStorage(page); // ✅ key line
    await use(page);
  },

  comboPage: async ({ page }, use) => {
    const comboPage = new ComboGiftsPage(page);
    await comboPage.goto();
    await use(comboPage);
  },

  shadowPage: async ({ page }, use) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.goto();
    await use(shadowPage);
  },

});

export const expect = test.expect;