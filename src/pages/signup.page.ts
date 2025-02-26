import {Page, Locator, BrowserContext} from '@playwright/test';
import BasePage from "./base.page";
import {waitForLocatorToBeVisible} from "../support/utils";

export class SignupPage extends BasePage {
    private readonly userName: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly signUpButton: Locator;
    private readonly header: Locator;
    private readonly alert: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.userName = page.locator('#username');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');
        this.signUpButton = page.locator("button[type='submit']");
        this.header = page.locator('h3');
        this.alert = page.locator("//div[@role='alert']");
    }

    async fillUserName(username: string): Promise<void> {
        await this.userName.fill(username);
    }

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPassword.fill(confirmPassword);
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }

    async isAlertDisplayed(): Promise<boolean> {
        return await this.alert.isVisible();
    }

    async getAlertText(): Promise<string> {
        return await this.alert.innerText();
    }

    async isSignupPageDisplayed(): Promise<boolean> {
        return (
            (await waitForLocatorToBeVisible(this.header)) &&
            (await this.header.innerText()) === 'Create Account'
        );
    }
}