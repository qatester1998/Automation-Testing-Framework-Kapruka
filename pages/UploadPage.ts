import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';
export class UploadPage extends BasePage {
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedText: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedText = page.locator('#uploaded-files');
  }

  async goto(): Promise<void> {
    await this.navigate('https://the-internet.herokuapp.com/upload');
  }

  async isLoaded(): Promise<void> {
    await expect(this.fileInput).toBeVisible();
  }

  async uploadFile(fileName: string): Promise<void> {
    const filePath = path.join(__dirname, `../test-data/${fileName}`);
    //const filePath = path.join('folder', 'subfolder', , 'sample.pdf')
    //const filePath = path.join('folder\subfolder\file.txt')//Windows
    //cost filePath = path.join('folder/subfolder/file.txt')//Linux/MAC


    await this.fileInput.setInputFiles(filePath);
    await this.click(this.uploadButton);
    
  }

  async verifyUpload(fileName: string): Promise<void> {
    await expect(this.uploadedText).toHaveText(fileName);
  }
}