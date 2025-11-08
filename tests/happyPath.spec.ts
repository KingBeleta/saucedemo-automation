import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/userCredentials.json';
import checkoutData from '../test-data/checkoutInfo.json';

test.describe('Happy Path [standard_user] - Complete Purchase Flow', () => {
    test('Login > Add to Cart > Checkout > Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new AllItemsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const user = users.find(u => u.username === 'standard_user')!;
        const randomCheckout = checkoutData[Math.floor(Math.random() * checkoutData.length)];

        // Login
        await loginPage.goto();
        await loginPage.login(page,user.username, user.password);

        // Select random item
        const selectedItem = await productsPage.addRandomItemToCart();
        
        // Verify item in cart
        await productsPage.openCart();
        await cartPage.verifyItemInCart(selectedItem);
        
        // Checkout
        const price = await cartPage.getItemPrice();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCheckoutInfo(randomCheckout.firstName, randomCheckout.lastName, randomCheckout.zipCode);
        await checkoutPage.validateItemAndSubTotal(selectedItem, price);
        await checkoutPage.finishCheckout();

        // Logout
        await loginPage.logout();
    });
});
