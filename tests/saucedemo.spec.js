import { test, expect } from '@playwright/test';
import LoginPage from './pages/loginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

test.describe('LoginPage tests', () => {
  test('Login with valid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await page.goto('/');
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(await page.title()).toBe("Swag Labs");
      await expect(page).toHaveURL(/\/inventory.html$/);
      await expect(page.locator('[data-test="title"]')).toBeVisible();
      await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  });

  test('Login with invalid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);

      await page.goto('/');
      await loginPage.login('invalid_user', 'wrong_password');
      const errorMessage = await loginPage.errorMessage();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

  });

  test('Login with blocked credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMessage = await loginPage.errorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

  });

  test('Trying to access inventory with no login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.errorMessage();

    await page.goto('/inventory.html');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');


  });
});

test.describe('ProductsPage tests', () => {
  test('Add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-backpack"]');
    await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    await productsPage.verifyCartLinkText('3');
  });

  test('Remove item to cart in products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-backpack"]');
    await productsPage.verifyCartLinkText('1');

    await productsPage.removeItemFromCart('[data-test="remove-sauce-labs-backpack"]');
    await productsPage.verifyCartLinkText('');
  });

  test.describe('Sort by', () => {
    
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/');
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Sort by Name (A-Z)', async ({ page }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.sortByName('asc');
      const productNamesAsc = await productsPage.getProductNames();
      const sortedNamesAsc = [...productNamesAsc].sort();
      expect(productNamesAsc).toEqual(sortedNamesAsc);
    });

    test('Sort by Name (Z-A)', async ({ page }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.sortByName('desc');
      const productNamesDesc = await productsPage.getProductNames();
      const sortedNamesDesc = [...productNamesDesc].sort().reverse();
      expect(productNamesDesc).toEqual(sortedNamesDesc);
    });

    test('Sort by Price (Low to High)', async ({ page }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.sortByPrice('asc');
      const productPricesAsc = await productsPage.getProductPrices();
      const sortedPricesAsc = [...productPricesAsc].sort((a, b) => a - b);
      expect(productPricesAsc).toEqual(sortedPricesAsc);
    });

    test('Sort by Price (High to Low)', async ({ page }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.sortByPrice('desc');
      const productPricesDesc = await productsPage.getProductPrices();
      const sortedPricesDesc = [...productPricesDesc].sort((a, b) => b - a);
      expect(productPricesDesc).toEqual(sortedPricesDesc);
    });
  });

  test.describe('CartPage tests', () => {
   
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await page.goto('/');
      await loginPage.login('standard_user', 'secret_sauce'); 
      
      await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-backpack"]');
      await productsPage.addItemToCart('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
      
      await page.goto('/cart.html');

    });

    test('Remove items from cart in cart page', async ({ page }) => {
      const cartPage = new CartPage(page);    
      const initialItemCount = await cartPage.getCartItemCount();
      expect(initialItemCount).toBeGreaterThan(0);
    
      await cartPage.removeItemFromCart('sauce-labs-backpack');
      let itemCountAfterFirstRemoval = await cartPage.getCartItemCount();
      expect(itemCountAfterFirstRemoval).toBe(initialItemCount - 1);
      const isItemRemovedBackpack = await cartPage.isItemInCart('sauce-labs-backpack');
      expect(isItemRemovedBackpack).toBe(false);
    
      
      await cartPage.removeItemFromCart('sauce-labs-bolt-t-shirt');
      let itemCountAfterSecondRemoval = await cartPage.getCartItemCount();
      expect(itemCountAfterSecondRemoval).toBe(itemCountAfterFirstRemoval - 1); 
      const isItemRemovedTShirt = await cartPage.isItemInCart('sauce-labs-bolt-t-shirt');
      expect(isItemRemovedTShirt).toBe(false);
    });

    test('Continue shopping', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.continueShopping();
      await expect(page).toHaveURL(/\/inventory.html$/);
    });

  });
});

