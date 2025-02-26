import {BrowserContext, Page} from "playwright";
import {LoginPage} from "./login.page";
import {DashboardPage} from "./dashboard.page";
import {SignupPage} from "./signup.page";

export class PagesObject {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    signupPage: SignupPage;

    constructor(public page: Page, public context: BrowserContext) {
        this.loginPage = new LoginPage(page, context);
        this.dashboardPage = new DashboardPage(page, context);
        this.signupPage = new SignupPage(page, context);
    }
}
