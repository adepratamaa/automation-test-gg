import { expect, type Locator, type Page } from '@playwright/test';

export class ConvertToTikTokPage {
  readonly page: Page;
  readonly convertToTikTokTile: Locator;
  readonly exploreMoreButton: Locator;
  readonly notNowButton: Locator;
  readonly rejectButton: Locator;
  readonly chooseClipTitle: Locator;
  readonly clipUrlInput: Locator;
  readonly getClipButton: Locator;
  readonly browseClipLibraryOption: Locator;
  readonly localUploadOption: Locator;
  readonly invalidUrlTitle: Locator;
  readonly invalidUrlDescription: Locator;

  // save the page and define all elements used on the convert to tiktok flow.
  constructor(page: Page) {
    this.page = page;
    this.convertToTikTokTile = page
      .locator('div.cursor-pointer')
      .filter({
        hasText:
          /Convert to Tiktok\s*Convert your clip to TikTok and enhance it with AI editing features\./i,
      })
      .first();
    this.exploreMoreButton = page.getByRole('button', {
      name: /^Explore more$/i,
    });
    this.notNowButton = page.getByRole('button', { name: /^Not Now$/i });
    this.rejectButton = page.getByRole('button', { name: /^Reject$/i });
    this.chooseClipTitle = page
      .getByRole('heading', { name: /^Choose a clip to edit$/i })
      .first();
    this.clipUrlInput = page
      .getByPlaceholder('Paste Twitch or Kick clips URL here')
      .first();
    this.getClipButton = page
      .getByRole('button', { name: /^Get Clip$/i })
      .first();
    this.browseClipLibraryOption = page
      .getByText(/^Browse Clip Library$/i)
      .first();
    this.localUploadOption = page.getByText(/^Local Upload$/i).first();
    this.invalidUrlTitle = page.getByText(/^Invalid Url$/i).first();
    this.invalidUrlDescription = page
      .getByText(/Please input the valid clip URL/i)
      .first();
  }

  // open the choose clip modal from the home quick action card.
  async openClipSelectionModal() {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      await this.dismissWelcomeModal();
      await this.convertToTikTokTile.scrollIntoViewIfNeeded();
      await this.clickLocatorCenter(this.convertToTikTokTile);
      await this.page.waitForTimeout(1000);

      if (await this.chooseClipTitle.isVisible()) {
        await this.expectClipSelectionModalVisible();
        return;
      }
    }

    await this.expectClipSelectionModalVisible();
  }

  // check that the choose clip modal is visible.
  async expectClipSelectionModalVisible() {
    await expect(this.chooseClipTitle).toBeVisible();
    await expect(this.clipUrlInput).toBeVisible();
    await expect(this.getClipButton).toBeVisible();
    await expect(this.browseClipLibraryOption).toBeVisible();
    await expect(this.localUploadOption).toBeVisible();
  }

  // fill an invalid clip url and submit it.
  async submitInvalidClipUrl(url: string) {
    await this.clipUrlInput.fill(url);
    await expect(this.getClipButton).toBeVisible();
    await this.getClipButton.click();
  }

  // check that the invalid url error is visible.
  async expectInvalidUrlErrorVisible() {
    await expect(this.invalidUrlTitle).toBeVisible();
    await expect(this.invalidUrlDescription).toBeVisible();
    await expect(
      this.page.getByText(/kick\.com\/channelname\/clips\/clip_id/i),
    ).toBeVisible();
    await expect(
      this.page.getByText(/twitch\.tv\/channelname\?clip=/i),
    ).toBeVisible();
  }

  // close the welcome modal if it appears.
  private async dismissWelcomeModal() {
    if (await this.exploreMoreButton.isVisible().catch(() => false)) {
      await this.clickLocatorCenter(this.exploreMoreButton);
    }

    if (await this.notNowButton.isVisible().catch(() => false)) {
      await this.clickLocatorCenter(this.notNowButton);
    }

    if (await this.rejectButton.isVisible().catch(() => false)) {
      await this.clickLocatorCenter(this.rejectButton);
    }
  }

  // click the center of an element.
  private async clickLocatorCenter(locator: Locator) {
    const box = await locator.boundingBox();
    if (!box) {
      return;
    }

    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }
}
