import { test } from '@playwright/test';
import { LandingPage } from '../src/pages/LandingPage';

test.describe('Landing page', () => {
  test('TC-LP-001: Verify public landing page', async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.open();
    await landingPage.expectLoaded();
    await landingPage.expectHeaderActionsVisible();
  });
});
