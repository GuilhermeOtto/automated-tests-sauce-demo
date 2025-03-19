const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/loginPage');

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(await page.title()).toBe("Swag Labs");
    await expect(page).toHaveURL(/\/inventory.html$/);
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




// // Teste 3: Adicionar item ao carrinho
// test('Adicionar item ao carrinho', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const inventoryPage = new InventoryPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');
//     await inventoryPage.addItemToCart('Sauce Labs Backpack');
//     await expect(inventoryPage.cartBadge).toHaveText('1');
// });

// // Teste 4: Remover item do carrinho
// test('Remover item do carrinho', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const inventoryPage = new InventoryPage(page);
//     const cartPage = new CartPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');
//     await inventoryPage.addItemToCart('Sauce Labs Backpack');
//     await inventoryPage.goToCart();
//     await cartPage.removeItem('Sauce Labs Backpack');
//     await expect(cartPage.cartItems).toHaveCount(0);
// });

// // Teste 5: Ordenação de produtos por preço
// test('Ordenação de produtos por preço', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const inventoryPage = new InventoryPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');
//     await inventoryPage.sortByPriceDescending();
//     const prices = await inventoryPage.getProductPrices();
//     expect(prices).toEqual([...prices].sort((a, b) => b - a));
// });
