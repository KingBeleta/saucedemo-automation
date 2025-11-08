import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/userCredentials.json';
import checkoutData from '../test-data/checkoutInfo.json';

test.describe('Multiple Items Checkout [standard_user]', () => {
  test('Login > Add Multiple Items > Checkout > Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new AllItemsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = users.find(u => u.username === 'standard_user')!;
    const randomCheckout = checkoutData[Math.floor(Math.random() * checkoutData.length)];

    // Login
    await loginPage.goto();
    await loginPage.login(page, user.username, user.password);

    // Select multiple random items
    const selectedItems = await productsPage.addMultipleRandomItemsToCart(3);
    
    // Verify items in cart
    await productsPage.openCart();
    await cartPage.verifyMultipleItemsInCart(selectedItems);
    
    // Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(randomCheckout.firstName, randomCheckout.lastName, randomCheckout.zipCode);
    await checkoutPage.finishCheckout();

    // Logout
    await loginPage.logout();
  });
});
