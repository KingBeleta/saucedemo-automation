import { Page, expect } from '@playwright/test';
import { LoginPageLocators as loginLoc} from '../locators/LoginPageLocators';
import { AllItemsPageLocators as allItemsLoc} from '../locators/AllItemsPageLocators';
import * as util from '../utils/GenericUtilities';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(page: Page, username: string, password: string) {
    await this.page.fill(loginLoc.usernameInput, username);
    await this.page.fill(loginLoc.passwordInput, password);
    await this.page.click(loginLoc.loginButton);
    await util.waitForStableDOM(page);
  }

  async logout() {
     await this.page.click(allItemsLoc.burger_menu_button);
     await this.page.click(allItemsLoc.logout_sidebar_link);
  }
}
