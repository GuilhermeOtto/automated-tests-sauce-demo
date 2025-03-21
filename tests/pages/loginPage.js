class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async login(username, password){
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.click('[data-test="login-button"]');
    }
    
    async errorMessage(){
        const errorLocator = this.page.locator('[data-test="error"]');
        return errorLocator;
    }

    async login(username, password) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async ensureAuthenticated(destination = '/inventory.html') {
        if (!this.page.context().storageState()) {
          await this.login('standard_user', 'secret_sauce');
          await this.page.context().storageState({ path: './tests/auth/auth.json' });
        }
    
        await this.page.goto(`https://www.saucedemo.com${destination}`);
    }
}
export default LoginPage;