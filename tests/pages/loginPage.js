class LoginPage{
    constructor(page){
        this.page = page;
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
}
export default LoginPage;