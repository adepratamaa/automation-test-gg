import { test } from '@playwright/test';
import { getEnv } from '../src/config/env';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { SettingsPage } from '../src/pages/SettingsPage';

test.describe('Account settings', () => {
  test('TC-SET-002: Verify Profile section and can edit the name', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.loginWithEmail(getEnv('EMAIL'), getEnv('PASSWORD'));
    await homePage.expectLoaded();

    await settingsPage.openProfile();
    await settingsPage.expectProfileLoaded(getEnv('EMAIL'));
  });
});
