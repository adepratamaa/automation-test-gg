import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly connectedAccountButton: Locator;
  readonly exploreMoreBtn: Locator;
  readonly notNowBtn: Locator;
  readonly notConnectedState: Locator;
  readonly connectManuallyText: Locator;
  readonly connectNewAccountTitle: Locator;
  readonly settingsOption: Locator;

  // save the page and define all elements used on the home page.
  constructor(page: Page) {
    this.page = page;
    this.connectedAccountButton = page
      .getByRole('button', { name: /connected accounts\s*0\/5/i })
      .first();
    this.exploreMoreBtn = page.getByRole('button', { name: 'Explore more' });
    this.notNowBtn = page.getByRole('button', { name: 'Not Now' });
    this.notConnectedState = page.getByText(/^Not Connected$/i).first();
    this.connectManuallyText = page
      .getByText(/connect or add new stream manually/i)
      .first();
    this.connectNewAccountTitle = page.getByText(/connect a new account/i);
    this.settingsOption = page.locator('#mySidebar .bottom-bar .select-none');
  }

  // check that the home page has loaded.
  async expectLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/app\.eklipse\.gg\/home/i);
    await expect(this.connectedAccountButton).toBeVisible();
    await this.dismissWelcomeModal();
  }

  // close the welcome modal if it appears.
  async dismissWelcomeModal() {
    if (await this.exploreMoreBtn.isVisible()) {
      await this.exploreMoreBtn.click();
    }

    if (await this.notNowBtn.isVisible()) {
      await this.notNowBtn.click();
    }
  }

  // open the connected accounts modal.
  async openConnectedAccounts() {
    await expect(this.connectedAccountButton).toBeVisible();
    await this.connectedAccountButton.click();
  }

  // check that the user has no connected streaming account.
  async expectNotConnectedStreamingAccountState() {
    await expect(this.notConnectedState).toBeVisible();
    await expect(this.connectManuallyText).toBeVisible();
  }

  // check that all platform connection options are visible.
  async expectStreamingPlatformConnectionOptionsVisible() {
    await expect(this.connectNewAccountTitle).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Twitch', exact: true }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'YouTube', exact: true }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Kick', exact: true }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Facebook', exact: true }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Rumble', exact: true }).first(),
    ).toBeVisible();
  }
}
