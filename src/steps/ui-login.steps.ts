import { expect} from "@playwright/test";
import { Given, When, Then} from "../fixtures/fixtures";

Given("I am on the login page", async function () {
    expect(await this.pages.loginPage.isLoginPageDisplayed()).toBeTruthy();
});

When("I enter {string} as username", async function (username: string) {
     await this.pages.loginPage.fillUserName(username);
});

When("I enter {string} as password", async function (password: string)  {
    await this.pages.loginPage.fillPassword(password);
});

When("I click the Login button", async function ()  {
    await this.pages.loginPage.clickLoginButton();
});

When("I click the Signup button", async function () {
    await this.pages.loginPage.clickSignUp();
})

Then("I should see an error message {string}", async function (error: string) {
     expect(await this.pages.loginPage.getAlertText()).toContain(error);
});