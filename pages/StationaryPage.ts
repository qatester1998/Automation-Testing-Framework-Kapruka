import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StationaryPage extends BasePage {

  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);

    
    this.productCards = page.locator('div.catalogueV2textBlock');
  }

  async goto(): Promise<void> {
    await this.navigate('/online/promotions/price/stationary');
  }

  async isLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');

    await expect
      .poll(async () => await this.productCards.count())
      .toBeGreaterThan(0);
  }

  // TUPLE IMPLEMENTATION
  async getProducts(): Promise<[string, string][]> {

    const count = await this.productCards.count();
    const products: [string, string][] = [];

    for (let i = 0; i < count; i++) {

      const row = this.productCards.nth(i);

      const name = await row
        .locator('.catalogueV2heading')
        .innerText();

      const price = await row
        .locator('.catalogueV2converted')
        .innerText();

      products.push([name.trim(), price.trim()]);
    }

    return products;
  }

  async printProducts(): Promise<void> {
    const products = await this.getProducts();

    for (const [name, price] of products) {
      console.log(`${name} → ${price}`);
    }
  }

  async validateProducts(): Promise<void> {
    const products = await this.getProducts();

    for (const [name, price] of products) {
      expect(name.length).toBeGreaterThan(0);
      expect(price).toContain('US$');
    }
  }
}