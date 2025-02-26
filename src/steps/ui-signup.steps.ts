import {expect} from "@playwright/test";
import {Given, Then} from "../fixtures/fixtures";


Given("I am on the signup page", async function () {
    const isDisplayed = await this.pages.signupPage.isSignupPageDisplayed();
    expect(isDisplayed).toBeTruthy();
});

Then("I am redirected to the sign up page", async function () {
    const isDisplayed = await this.pages.signupPage.isSignupPageDisplayed();
    expect(isDisplayed).toBeTruthy();
})

Given("I enter {string} as signup email", async function (email: string) {
    await this.pages.signupPage.fillEmail(email);

})

Given("I confirm the password by entering {string}", async function (confirmPassword: string) {
    await this.pages.signupPage.fillConfirmPassword(confirmPassword);

})

Given('I submit the Signup form', async function () {
    await this.pages.signupPage.clickSignUpButton();
});