class CartPage {
    constructor(page) {
        this.page = page;
    }

    async removeItemFromCart(itemName) {
        const removeButton = this.page.locator(`[data-test="remove-${itemName}"]`);
        await removeButton.click();
    }

    async getCartItemCount() {
        const cartItems = await this.page.locator('.cart_item');
        return await cartItems.count();
    }

    async isItemInCart(itemName) {
        const itemLocator = this.page.locator(`[class="cart_item"] >> text=${itemName}`);
        return await itemLocator.isVisible();
    }

    async continueShopping() {
        const continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
        await continueShoppingButton.click();
    }
}
export default CartPage;