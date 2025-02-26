import {Page, Locator, BrowserContext} from '@playwright/test';
import BasePage from "./base.page";
import {waitForLocatorToBeVisible} from "../support/utils";

export class DashboardPage extends BasePage {
    private readonly createTestCaseForm: Locator;
    private readonly headerGreeting: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.createTestCaseForm = page.locator("#create-test-case-form");
        this.headerGreeting = page.locator("//span[contains(text(),'Welcome')]");
        this.logoutButton = page.locator("#logout-button");
    }

    public async isCreateTestCaseFormDisplayed(): Promise<boolean> {
        return await waitForLocatorToBeVisible(this.createTestCaseForm);
    }

    public async isHeaderGreetingDisplayed(): Promise<boolean> {
        return await this.headerGreeting.isVisible();
    }

    public async getHeaderGreetingText(): Promise<string> {
        return await this.headerGreeting.innerText();
    }

    public async clickLogoutButton(): Promise<void> {
        await this.logoutButton.click();
    }
}