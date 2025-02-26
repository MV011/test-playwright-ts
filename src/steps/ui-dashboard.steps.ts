import { expect} from "@playwright/test";
import { When, Then} from "../fixtures/fixtures";


Then("I should be redirected to the dashboard", async function()
{
    expect(await this.pages.dashboardPage.isCreateTestCaseFormDisplayed()).toBeTruthy();
});

Then("I should see {string} in the header", async function (text: string) {
    expect(await this.pages.dashboardPage.isHeaderGreetingDisplayed()).toBeTruthy();
    const headerGreetingText = await this.pages.dashboardPage.getHeaderGreetingText();
    expect(headerGreetingText).toContain(text);
});

When("I click the Logout button", async function () {
    await this.pages.dashboardPage.clickLogoutButton();
});