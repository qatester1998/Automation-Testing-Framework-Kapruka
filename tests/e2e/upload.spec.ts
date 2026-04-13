import { test } from '@playwright/test';
import { UploadPage } from '../../pages/UploadPage';

test.describe('File Upload Feature', () => {
  test('User should upload file successfully', async ({ page }) => {

    const uploadPage = new UploadPage(page);

    // Step 1: Navigate
    await uploadPage.goto();

    // Step 2: Validate page loaded
    await uploadPage.isLoaded();

    // Step 3: Upload file
    await uploadPage.uploadFile('Shubham_CV.pdf');

    // Step 4: Verify upload
    await uploadPage.verifyUpload('Shubham_CV.pdf');

  });
});