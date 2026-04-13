import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SameDayDeliveryPage extends BasePage {

  readonly productRows: Locator;

  constructor(page: Page) {
    super(page);

    // Skip header row using XPath
    this.productRows = page.locator('//div[contains(@class, "Rebrand_table")]//table/tbody/tr[td]');
  }

  async goto(): Promise<void> {
    await this.navigate('/online/samedaydelivery');
  }

  async isLoaded(): Promise<void> {
    // await this.page.waitForLoadState('networkidle');

    // Ensure at least 1 valid data row
    await expect(this.productRows.first()).toBeVisible();
  }

  async getRowCount(): Promise<number> {
    return await this.productRows.count();
  }

  // Stable table read
  async printTable(): Promise<void> {
    const count = await this.getRowCount();

    for (let i = 0; i < count; i++) {
      const row = this.productRows.nth(i);

      const name = await row.locator('xpath=.//td[1]').innerText();
      const price = await row.locator('xpath=.//td[2]').innerText();

      console.log(`Product: ${name.trim()} | Price: ${price.trim()}`);
    }
  }

  // Reliable validation
  async validateProductPrice(productName: string, expectedPrice: string) {
    const count = await this.getRowCount();

    for (let i = 0; i < count; i++) {
      const row = this.productRows.nth(i);

      const name = (await row.locator('xpath=.//td[1]').innerText()).trim();

      if (name === productName.trim()) {
        const price = (await row.locator('xpath=.//td[2]').innerText()).trim();

        expect(price).toBe(expectedPrice);
        return;
      }
    }

    throw new Error(`Product not found: ${productName}`);
  }
}