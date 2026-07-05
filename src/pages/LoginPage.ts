import { expect, type Locator, type Page } from '@playwright/test';
import { getEnv } from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly emailOption: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly loginFailedTitle: Locator;
  readonly loginFailedMessage: Locator;
  readonly cookiesBanner: Locator;
  readonly rejectButton: Locator;

  // save the page and define all elements used on the login page.
  constructor(page: Page) {
    this.page = page;
    this.emailOption = page.getByRole('button', { name: /^email$/i }).first();
    this.forgotPasswordLink = page
      .getByRole('link', { name: /forgot.*password/i })
      .first();
    this.signUpLink = page.getByRole('link', { name: /sign up/i }).first();
    this.emailInput = page
      .getByRole('textbox', { name: /email/i })
      .or(page.locator('input[type="email"]'))
      .first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.signInButton = page
      .getByRole('button', { name: /^sign in$/i })
      .first();
    this.loginFailedTitle = page.getByText(/login failed/i).first();
    this.loginFailedMessage = page
      .getByText(/account or password is incorrect/i)
      .first();
    this.cookiesBanner = this.page.getByText('This website uses cookies to');
    this.rejectButton = this.page.getByRole('button', { name: 'Reject' });
  }

  // open the login page.
  async open() {
    await this.page.goto(getEnv('LOGIN_URL'), {
      waitUntil: 'domcontentloaded',
    });
  }

  // check that the login page has loaded and close the cookie banner.
  async expectLoaded() {
    await expect(this.page).toHaveURL(/app\.eklipse\.gg\/login/i);
    await this.expectAccountOptionsVisible();
    if (await this.cookiesBanner.isVisible({ timeout: 1000 })) {
      await this.rejectButton.click();
    }
  }

  // check that all login options are visible.
  async expectAccountOptionsVisible() {
    await this.page.waitForTimeout(1000);
    await expect(this.emailOption).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  // open the email login form.
  async openEmailForm() {
    await expect(this.emailOption).toBeVisible();
    await this.emailOption.click();
  }

  // check that the email login form is visible.
  async expectEmailFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  // fill email and password, then submit the login form.
  async loginWithEmail(email: string, password: string) {
    await this.openEmailForm();
    await this.expectEmailFormVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // check that the invalid login message is visible.
  async expectLoginFailedMessageVisible() {
    await expect(this.page).toHaveURL(/app\.eklipse\.gg\/login/i);
    await expect(this.loginFailedTitle).toBeVisible();
    await expect(this.loginFailedMessage).toBeVisible();
  }
}
