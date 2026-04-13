import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FramesPage extends BasePage {

  //  (frame_3 has nested iframe)
  readonly frame3;
  readonly nestedFrame;

  readonly inputBox: Locator;
  readonly checkbox: Locator;

  constructor(page: Page) {
    super(page);

    // frame3 locator
    this.frame3 = page.frameLocator('frame[src="frame_3.html"]');

    // nested frame locator
    this.nestedFrame = this.frame3.frameLocator('iframe');

    // 
    this.inputBox = this.nestedFrame.locator('input[type="text"]').first();
    this.checkbox = this.nestedFrame.locator('div[role="checkbox"]').first();
  }

  async goto(): Promise<void> {
    await this.navigate('https://ui.vision/demo/webtest/frames/');
  }

   async isLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
   }

  async fillText(text: string): Promise<void> {
    await this.inputBox.waitFor({ state: 'visible' });
    await this.inputBox.fill(text);
  }

  async selectCheckbox(): Promise<void> {
    await this.checkbox.click();
  }

  async validateText(text: string): Promise<void> {
    await expect(this.inputBox).toHaveValue(text);
  }
}