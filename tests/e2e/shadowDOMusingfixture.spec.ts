import { test, expect } from '../../fixtures/fixtures';

test('Shadow DOM using fixture', async ({ shadowPage }) => {

  await shadowPage.enterShadowText('Playwright');
  await shadowPage.enterNestedShadowText('Automation');

});