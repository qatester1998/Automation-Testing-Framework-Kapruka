import { Page, Locator } from '@playwright/test';

export class ComboGiftsPage {

  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;

    this.products = page.locator('.catalogueV2Repeater > div');
  }

  async goto() {
    await this.page.goto('https://www.kapruka.com/online/combogifts');
  }

async getFirstProductName(): Promise<string> {

  const nameLocator = this.page.locator('.catalogueV2heading').first();

  await nameLocator.waitFor({ state: 'visible', timeout: 20000 });

  const name = await nameLocator.textContent();

  return name?.trim() || '';
}

async getFirstProductPrice(): Promise<string> {

  const priceLocator = this.page
    .locator('.catalogueV2converted span:last-child')
    .first();

  await priceLocator.waitFor({ state: 'visible', timeout: 20000 });

  const price = await priceLocator.textContent();

  return price?.trim() || '';
}
}