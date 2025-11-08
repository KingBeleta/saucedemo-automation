import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/userCredentials.json';
import { LoginPageLocators as loginLoc } from '../locators/LoginPageLocators.ts';


test.describe.serial('Negative Login Scenarios', () => {
  
  test('Invalid credentials show error message', async ({ page }) => {
    const login = new LoginPage(page);
    const user = users.find(u => u.username === 'standard_user')!;
    await login.goto();
    await login.login(page, user.username, user.password +'err');
    await expect(page.locator(loginLoc.errorMessage)).toHaveText(/Epic sadface: Username and password do not match any user in this service/i
    );
  });

  test('Locked out user show error message', async ({ page }) => {
    const login = new LoginPage(page);
    const user = users.find(u => u.username === 'locked_out_user')!;
    await login.goto();
    await login.login(page, user.username, user.password);
    await expect(page.locator(loginLoc.errorMessage)).toHaveText(/Epic sadface: Sorry, this user has been locked out./i
    );
  });
});
