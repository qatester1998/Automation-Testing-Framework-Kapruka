/**
 * pages/HomePage.ts
 * Page Object for the Kapruka home page (https://www.kapruka.com).
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//inherits navigate, click, fill, isloaded
export class HomePage extends BasePage
{
readonly currencyDropdown: Locator;

constructor(page: Page)
{
  super(page);
  this.currencyDropdown = page.locator('select[aria-label="Select Currency"]');
}
async goto():Promise<void>
{
  await this.navigate('/'); //https://www.kapruka.com
}

async isLoaded(): Promise<void> {
  
  await expect(this.currencyDropdown).toBeVisible();
}
//'INR | USD  - union type operator
//selectOption -> find the visible text "INR", "USD"

async selectCurrency(currency: 'INR' | 'USD'): Promise<void>
{
  await this.currencyDropdown.waitFor({state: 'visible'});
  await this.currencyDropdown.selectOption({label: currency});
  //page reloads afetr selection
  await this.page.waitForLoadState('load');
}

//verify the currency assertion

async verifyCurrency(expected: string): Promise<void>
{
  await expect(this.currencyDropdown).toHaveValue(expected);
}

async getTitle(): Promise<string> {
  return await this.page.title();
}


}