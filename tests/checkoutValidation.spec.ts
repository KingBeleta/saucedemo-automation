import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/userCredentials.json';
import checkoutData from '../test-data/checkoutInfo.json';
import { CheckoutPageLocators as checkoutLoc } from '../locators/CheckoutPageLocators';

test('Checkout requires mandatory fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new AllItemsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = users.find(u => u.username === 'standard_user')!;
    const randomCheckout = checkoutData[Math.floor(Math.random() * checkoutData.length)];

    // Login
    await loginPage.goto();
    await loginPage.login(page, user.username, user.password);

    // Select random item
    const selectedItem = await productsPage.addRandomItemToCart();

    // Verify item in cart
    await productsPage.openCart();
    await cartPage.verifyItemInCart(selectedItem);

    // Checkout but dont fillout checkout info
    const price = await cartPage.getItemPrice();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('', '', '');

    // Expect validation message
    await expect(page.locator(checkoutLoc.checkout_error)).toContainText('Error');

    // Logout
    await loginPage.logout();
});
