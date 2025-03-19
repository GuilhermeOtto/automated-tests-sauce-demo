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
