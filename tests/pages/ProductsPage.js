import { expect } from '@playwright/test';

class ProductsPage {
    constructor(page) {
        this.page = page;
    }

    async addItemToCart(itemLocator) {
        await this.page.click(itemLocator);
    }

    async verifyCartItemCount(expectedCount) {
        const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        await expect(cartBadge).toHaveText(expectedCount);
    }

    async verifyCartLinkText(expectedText) {
        const cartLink = this.page.locator('[data-test="shopping-cart-link"]');
        await expect(cartLink).toHaveText(expectedText);
    }

    async removeItemFromCart(itemLocator) {
        await this.page.click(itemLocator);
    }

    async sortByName(order = 'asc') {
        const sortDropdown = this.page.locator('[data-test="product-sort-container"]');
        await sortDropdown.selectOption(order === 'asc' ? 'az' : 'za');
    }    

    async sortByPrice(order = 'asc') {
        const sortDropdown = this.page.locator('[data-test="product-sort-container"]');
        await sortDropdown.click();
        const optionValue = order === 'asc' ? 'lohi' : 'hilo';
        const optionLocator = this.page.locator(`[value="${optionValue}"]`);
        await sortDropdown.selectOption({ value: optionValue });
    }

    async getProductNames() {
        const nameElements = this.page.locator('[data-test="inventory-item-name"]');
        return await nameElements.allTextContents();
    }

    async getProductPrices() {
        const priceElements = this.page.locator('[data-test="inventory-item-price"]');
        const priceTexts = await priceElements.allTextContents(); 
        const prices = priceTexts.map(price => parseFloat(price.replace('$', '').trim()));
        return prices;  
     }
}
export default ProductsPage;
