import { test } from '@playwright/test';
import { getEnv } from '../src/config/env';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Register/Login', () => {
  test('TC-AUTH-002: Verify invalid email login shows a clear error', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const invalidPassword = `${getEnv('PASSWORD')}-invalid`;

    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.loginWithEmail(getEnv('EMAIL'), invalidPassword);
    await loginPage.expectLoginFailedMessageVisible();
  });

  test('TC-AUTH-003: Verify valid email login redirects to Home', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.loginWithEmail(getEnv('EMAIL'), getEnv('PASSWORD'));
    await homePage.expectLoaded();
  });
});
