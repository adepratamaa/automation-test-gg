import { expect, type Locator, type Page } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly yourProfileTitle: Locator;
  readonly profileTab: Locator;
  readonly editNameButton: Locator;
  readonly changePasswordButton: Locator;
  readonly nameInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly communitySettingsTitle: Locator;
  readonly notificationToggle: Locator;
  readonly deleteAccountButton: Locator;

  // save the page and define all elements used on the settings page.
  constructor(page: Page) {
    this.page = page;
    this.yourProfileTitle = page.getByText(/your profile/i).first();
    this.profileTab = page.getByText(/^Profile$/i).first();
    this.editNameButton = page.getByRole('button', { name: /edit name/i });
    this.changePasswordButton = page.getByRole('button', {
      name: /change password/i,
    });
    this.nameInput = page.getByPlaceholder('Enter your name');
    this.continueButton = page.getByRole('button', { name: /^continue$/i });
    this.cancelButton = page.getByRole('button', { name: /^cancel$/i });
    this.communitySettingsTitle = page.getByText(/community settings/i).first();
    this.notificationToggle = page.getByRole('switch', {
      name: /enable notifications/i,
    });
    this.deleteAccountButton = page
      .getByRole('button', { name: /^delete account$/i })
      .last();
  }

  // check that the profile page and profile data are visible.
  async expectProfileLoaded(email: string) {
    await expect(this.page).toHaveURL(/app\.eklipse\.gg\/account#profile/i);
    await expect(this.yourProfileTitle).toBeVisible();
    await expect(this.profileTab).toBeVisible();
    await expect(this.page.getByText(/^Name$/i)).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
    await expect(this.page.getByText('********')).toBeVisible();
    await expect(this.editNameButton).toBeVisible();
    await expect(this.changePasswordButton).toBeVisible();
    await expect(this.communitySettingsTitle).toBeVisible();
    await expect(this.notificationToggle).toBeVisible();
    await expect(this.deleteAccountButton).toBeVisible();
  }

  // update the profile name and wait until the form closes.
  async updateName(name: string) {
    await this.openEditNameForm();
    await this.nameInput.fill(name);
    await this.continueButton.click();
    await expect(this.nameInput).toBeHidden();
  }

  // check that the updated name is visible on the page.
  async expectNameValue(name: string) {
    await expect(
      this.page.getByText(name, { exact: true }).first(),
    ).toBeVisible();
  }

  // open the edit name form.
  private async openEditNameForm() {
    await expect(this.editNameButton).toBeVisible();
    await this.editNameButton.click();
    await expect(this.nameInput).toBeVisible();
  }
}
