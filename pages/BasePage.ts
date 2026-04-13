import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  //declaring a property as readonly - setting once, never changed
  //constructor runs automatically when you write LoginPage(page)

  constructor(page: Page) {
    this.page = page;
    //current instance of the object 
  }

  // Navigation
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load' });
  }
  //a=20,b=30, c=a+b= 50, next test cases - return type (50)

  // Common Actions
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  //20 test cases -> click -> click method 20 times - increases line of the code

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }
  //asynchronous - pause and wait
  //await - waitUntil:loaded
  //Promose<void> -> return type nothing, Promise -> will finish in future

  // Common Assertions
  async verifyUrlContains(text: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  // Must be implemented in each page
  abstract isLoaded(): Promise<void>;
}
//abstract method - does not has any body
//Class extends BasePage MUST implement , no implementation - error