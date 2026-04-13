import { test } from '@playwright/test';
import { FramesPage } from '../../pages/FramesPage';

test('Handle nested iframe correctly', async ({ page }) => {

  const framesPage = new FramesPage(page);

  await framesPage.goto();

  await framesPage.fillText('Playwright Nested Frames');

  await framesPage.selectCheckbox();

  await framesPage.validateText('Playwright Nested Frames');
});