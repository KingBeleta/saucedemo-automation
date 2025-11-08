import { Page, expect } from '@playwright/test';
import { CheckoutPageLocators as checkoutLoc } from '../locators/CheckoutPageLocators';


export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(checkoutLoc.checkout_firstname_field, firstName);
    await this.page.fill(checkoutLoc.checkout_lastname_field, lastName);
    await this.page.fill(checkoutLoc.checkout_zipcode_field, postalCode);
    await this.page.click(checkoutLoc.checkout_continue_button);
  }

  async validateItemAndSubTotal(itemName: string, expectedPrice: string) {
    await expect(this.page.locator(checkoutLoc.checkout_overview_item_name)).toHaveText(itemName);
    const total = await this.page.locator(checkoutLoc.checkout_overview_item_subtotal).innerText();
    expect(total).toContain(expectedPrice.replace('$', ''));
  }

  async finishCheckout() {
    await this.page.click(checkoutLoc.finish_checkout_button);
    await expect(this.page.locator(checkoutLoc.complete_checkout_header)).toHaveText('Thank you for your order!');
  }
}
