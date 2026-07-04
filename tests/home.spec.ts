import { test } from '@playwright/test';
import { getEnv } from '../src/config/env';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Home', () => {
  test('TC-HOME-002: Verify not connected streaming account state', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.loginWithEmail(getEnv('EMAIL'), getEnv('PASSWORD'));

    await homePage.expectLoaded();
    await homePage.expectNotConnectedStreamingAccountState();
    await homePage.openConnectedAccounts();
    await homePage.expectStreamingPlatformConnectionOptionsVisible();
  });
});
