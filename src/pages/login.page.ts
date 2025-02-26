import {Page, Locator, BrowserContext} from '@playwright/test';
import BasePage from "./base.page";

export class LoginPage extends BasePage {
    private readonly userName: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly error: Locator;
    private readonly signUp: Locator;
    private readonly header: Locator;
    private readonly alert: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.locator('//button[@type="submit"]');
        this.header = page.locator('//h3');
        this.signUp = page.getByText('Sign up');
        this.error = page.getByText('Please fill out this field.');
        this.alert = page.locator('//div[@role="alert"]');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    public async fillUserName(username: string): Promise<void> {
        await this.userName.fill(username);
    }

    public async fillPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    public async clickSignUp(): Promise<void> {
        await this.signUp.click();
    }

    public async isErrorDisplayed(): Promise<boolean> {
        return await this.error.isVisible();
    }

    public async isAlertDisplayed(): Promise<boolean> {
        return await this.alert.isVisible();
    }

    public async getAlertText(): Promise<string> {
        return await this.alert.locator('div').innerText();
    }

    public async isLoginPageDisplayed(): Promise<boolean> {
        return await this.header.innerText() === 'Login';
    }
}