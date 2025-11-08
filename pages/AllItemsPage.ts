import { Page, expect } from '@playwright/test';
import { AllItemsPageLocators as itemLoc } from '../locators/AllItemsPageLocators';
import { CartPageLocators as cartLoc } from '../locators/CartPageLocators';
import products from '../test-data/products.json';


export class AllItemsPage {
    constructor(private page: Page) { }

    itemList = products;

    async addRandomItemToCart() {
        const randomIndex = Math.floor(Math.random() * this.itemList.length);
        const itemName = this.itemList[randomIndex].name;

        const itemLocator = this.page.locator(itemLoc.item_name, { hasText: itemName });
        await expect(itemLocator).toBeVisible();

        await this.page.locator(`button:has-text("Add to cart")`).nth(randomIndex).click();

        return itemName;
    }

    async openCart() {
        await this.page.click(cartLoc.shopping_cart_link);
    }

    async addMultipleRandomItemsToCart(count: number): Promise<string[]> {
        const itemLocators = this.page.locator(itemLoc.item_name);
        const totalItems = await itemLocators.count();

        const selectedIndices: number[] = [];
        while (selectedIndices.length < count) {
            const randomIndex = Math.floor(Math.random() * totalItems);
            if (!selectedIndices.includes(randomIndex)) {
                selectedIndices.push(randomIndex);
            }
        }

        const selectedItems: string[] = [];

        for (const index of selectedIndices) {
            const itemName = await itemLocators.nth(index).textContent();
            selectedItems.push(itemName?.trim() || '');

            const addToCartButton = this.page.locator('.inventory_item').nth(index).locator('button');
            await addToCartButton.click();
        }

        return selectedItems;
    }


    async sortByNameAZ() {
        await this.page.selectOption(itemLoc.sort_dropdown, 'Name (A to Z)');
    }

    async sortByNameZA() {
        await this.page.selectOption(itemLoc.sort_dropdown, 'Name (Z to A)');
    }

    async sortByPriceLowHigh() {
        await this.page.selectOption(itemLoc.sort_dropdown, 'Price (low to high)');
    }

    async sortByPriceHighLow() {
        await this.page.selectOption(itemLoc.sort_dropdown, 'Price (high to low)');
    }

    async getAllItemNames(): Promise<string[]> {
        const names = await this.page.$$eval(itemLoc.item_names, els => els.map(e => e.textContent?.trim() || ''));
        return names;
    }

    async getAllItemPrices(): Promise<number[]> {
        const prices = await this.page.$$eval(itemLoc.item_prices, els =>
            els.map(e => parseFloat(e.textContent?.replace('$', '') || '0'))
        );
        return prices;
    }

    async validateNamesSortedAscending() {
        const names = await this.getAllItemNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    }

    async validateNamesSortedDescending() {
        const names = await this.getAllItemNames();
        const sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(sorted);
    }

    async validatePricesSortedAscending() {
        const prices = await this.getAllItemPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    }

    async validatePricesSortedDescending() {
        const prices = await this.getAllItemPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }

}
