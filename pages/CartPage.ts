import { Page, expect } from '@playwright/test';
import { CartPageLocators as cartLoc } from '../locators/CartPageLocators';
import { CheckoutPageLocators as checkoutLoc } from '../locators/CheckoutPageLocators';

export class CartPage {
  constructor(private page: Page) { }

  async verifyItemInCart(itemName: string) {
    const itemNameLocator = this.page.locator(cartLoc.cart_item_name);
    await expect(itemNameLocator).toHaveText(itemName, { ignoreCase: true });
  }

  async getItemPrice(): Promise<string> {
    return this.page.locator(cartLoc.cart_item_price).first().innerText();
  }

  async proceedToCheckout() {
    await this.page.click(cartLoc.cart_checkout_button);
  }

  async verifyMultipleItemsInCart(expectedItems: string[]) {
    const cartItems = this.page.locator(cartLoc.cart_item_name);
    const count = await cartItems.count();

    const cartItemNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = (await cartItems.nth(i).textContent())?.trim() || '';
      cartItemNames.push(name);
    }

    for (const expected of expectedItems) {
      await expect(cartItemNames).toContain(expected);
    }
  }

}
