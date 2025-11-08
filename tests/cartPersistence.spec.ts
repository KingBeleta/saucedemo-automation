import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/userCredentials.json';
import checkoutData from '../test-data/checkoutInfo.json';


test('Cart items persist after logging out', async ({ page }) => {
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

    // Logout
    await loginPage.logout();

    // Login again
    await loginPage.goto();
    await loginPage.login(page, user.username, user.password);

    // Verify that the item should still be in the cart
    await productsPage.openCart();
    await cartPage.verifyItemInCart(selectedItem);

    // Logout
    await loginPage.logout();

});
