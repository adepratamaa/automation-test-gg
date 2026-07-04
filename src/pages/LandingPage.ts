import { expect, type Locator, type Page } from '@playwright/test';
import { getEnv } from '../config/env';

export class LandingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;
  readonly heroHeadline: Locator;

  // save the page and define all elements used on the landing page.
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header').first();
    this.signInLink = page.getByRole('link', { name: /sign in/i }).first();
    this.signUpLink = page
      .getByRole('link', { name: /sign up for free|sign up/i })
      .first();
    this.heroHeadline = page.getByText(/ready-to-post.*clip/i).first();
  }

  // open the public landing page.
  async open() {
    await this.page.goto(getEnv('LANDING_URL'), {
      waitUntil: 'domcontentloaded',
    });
  }

  // check that the landing page has loaded.
  async expectLoaded() {
    await expect(this.page).toHaveURL(/eklipse\.gg/);
    await expect(this.page.locator('body')).toBeVisible();
    await expect(this.heroHeadline).toBeVisible();
  }

  // check that the header and main auth buttons are visible.
  async expectHeaderActionsVisible() {
    await expect(this.header).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  // click the sign in link from the landing page.
  async clickSignIn() {
    await expect(this.signInLink).toBeVisible();
    await this.signInLink.click();
  }
}
