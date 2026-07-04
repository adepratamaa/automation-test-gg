import { test } from '@playwright/test';
import { getEnv } from '../src/config/env';
import { ConvertToTikTokPage } from '../src/pages/ConvertToTikTokPage';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Convert to TikTok', () => {
  test('TC-TT-002: Verify Twitch or Kick clip URL validation', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const convertToTikTokPage = new ConvertToTikTokPage(page);

    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.loginWithEmail(getEnv('EMAIL'), getEnv('PASSWORD'));
    await homePage.expectLoaded();

    await convertToTikTokPage.openClipSelectionModal();
    await convertToTikTokPage.submitInvalidClipUrl(
      'https://www.twitch.tv/not-a-valid-clip-url',
    );
    await convertToTikTokPage.expectInvalidUrlErrorVisible();
  });
});
