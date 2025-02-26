import {DataTable} from "playwright-bdd";
import {Given, Then} from "../fixtures/fixtures";
import {APIResponse, expect} from "@playwright/test";
import {processDataTable, expectMultiple} from "../support/utils";
import {CreateUserRequest} from "../types/models/request/create-user.request";
import {UserResponse} from "../types/models/response/user.response";
import {RequestOptions} from "../types/request-options";
import {LoginResponse} from "../types/models/response/login.response";


Given(/^I have a payload set for CreateUserRequest with the following data:$/,
    async function (table: DataTable) {
        let data = processDataTable(table);

        let request: CreateUserRequest = {
            email: data[0].get("email")!,
            username: data[0].get("username")!,
            password: data[0].get("password")!
        };
        this.scenarioData.set("payload", request);
    });

Then("the response should contain user information",
    async function () {
        let response: APIResponse = this.scenarioData.get("response");
        let request = this.scenarioData.get("payload");
        let body: UserResponse = await response.json();

        expect(() => {
            expect(body.email).toBe(request.email);
            expect(body.username).toBe(request.username);
            expect(body.is_active).toBe(true);
            expect(body.id).toBeGreaterThan(0);
        }).not.toThrow();
    });

Given(/^I have request options set for login with the following data:$/, async function (table: DataTable) {
    let data = processDataTable(table);

    let requestOptions: RequestOptions = {
        form: {
            username: data[0].get("username")!,
            password: data[0].get("password")!
        }
    };

    this.scenarioData.set("requestOptions", requestOptions);
});

Then("the response should contain a token",
    async function () {
        let response: APIResponse = this.scenarioData.get("response");
        let body: LoginResponse = await response.json();

        expectMultiple([
            () => expect(body.access_token).not.toBeNull(),
            () => expect(body.access_token).not.toHaveLength(0)
        ]);

        this.scenarioData.set("token", body.access_token);

    });


Given("I update my headers with the authorization token",
    async function () {
        let token = this.scenarioData.get("token");
        this.apiClient!.addDefaultHeader("Authorization", `Bearer ${token}`);
    });