import { test as base } from '@playwright/test';
import { ComboGiftsPage } from '../pages/ComboGiftsPage';
import { ShadowDomPage } from '../pages/ShadowDomPage';

type MyFixtures = {
  comboPage: ComboGiftsPage;
  shadowPage: ShadowDomPage;
};

export const test = base.extend<MyFixtures>({
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