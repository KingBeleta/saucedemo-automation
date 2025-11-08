import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import users from '../test-data/userCredentials.json';

test.describe('Sorting Feature Validation - [standard_user]', () => {

    test('Validate all sorting options (A→Z, Z→A, Low→High, High→Low)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new AllItemsPage(page);
        const user = users.find(u => u.username === 'standard_user')!;
        await loginPage.goto();
        await loginPage.login(page, user.username, user.password);

        // Name A - Z
        await test.step('Sort by Name (A - Z)', async () => {
            await productsPage.sortByNameAZ();
            await productsPage.validateNamesSortedAscending();
        });

        // Name Z - A
        await test.step('Sort by Name (Z - A)', async () => {
            await productsPage.sortByNameZA();
            await productsPage.validateNamesSortedDescending();
        });

        // Price Low - High
        await test.step('Sort by Price Low - High)', async () => {
            await productsPage.sortByPriceLowHigh();
            await productsPage.validatePricesSortedAscending();
        });

        // Price High - Low
        await test.step('Sort by Price High - Low)', async () => {
            await productsPage.sortByPriceHighLow();
            await productsPage.validatePricesSortedDescending();
        });
    });
});