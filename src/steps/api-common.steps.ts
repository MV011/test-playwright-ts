import {Given, Then, When} from "../fixtures/fixtures";
import {RequestOptions} from "../types/request-options";
import {APIResponse, expect} from "@playwright/test";
import {CurrentUserResponse} from "../types/models/response/current-user.response";
import {ErrorResponse} from "../types/models/response/error.response";

When("I send a {string} request to {string}", async function (method: string, endpoint: string) {
    let requestOptions: RequestOptions = {};

    if (this.scenarioData.has("requestOptions")) {
        requestOptions = this.scenarioData.get("requestOptions");
    } else if ((this.scenarioData.has("payload"))) {
        requestOptions.data = this.scenarioData.get("payload");
    }

    this.scenarioData.set("response", await this.apiClient!.sendRequest(method, endpoint, requestOptions));
});

Then("the response status code should be {int}", async function (code: number) {
    let response: APIResponse = this.scenarioData.get("response");

    expect(response.status()).toEqual(code);
});

Then("the response should contain the error {string}",
    async function (error: string) {
        let response: APIResponse = this.scenarioData.get("response");
        let body: ErrorResponse = await response.json();

        expect(body.detail).toContain(error);
    });

Given("I remove any leftover request data",
    async function () {
        if (this.scenarioData.has("requestOptions")) {
            this.scenarioData.delete("requestOptions");
        }
        if (this.scenarioData.has("payload")) {
            this.scenarioData.delete("payload");
        }
    });

Then("I save the logged in user's data", async function () {
    let response: APIResponse = this.scenarioData.get("response");
    let body: CurrentUserResponse = await response.json();

    this.scenarioData.set("currentUser", body);
});