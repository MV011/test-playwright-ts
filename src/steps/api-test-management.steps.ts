import {Given, Then} from "../fixtures/fixtures";
import {DataTable} from "playwright-bdd";
import {expectMultiple, processDataTable} from "../support/utils";
import {CreateTestCaseRequest} from "../types/models/request/create-testcase.request";
import {APIResponse, expect} from "@playwright/test";
import {TestCaseResponse} from "../types/models/response/test-case.response";
import {CurrentUserResponse} from "../types/models/response/current-user.response";

Given("I have a payload set for CreateTestCase with the following data:",
    async function (table: DataTable) {
        let data = processDataTable(table);

        let request: CreateTestCaseRequest = {
            title: data[0].get("title")!,
            description: data[0].get("description")!,
            status: data[0].get("status")!
        }

        this.scenarioData.set("payload", request)
    });

Then("the response should contain the created test case",
    async function () {
        let response: APIResponse = this.scenarioData.get("response");
        let request: CreateTestCaseRequest = this.scenarioData.get("payload");
        let body: TestCaseResponse = await response.json();

        expectMultiple([
            () => expect(body.title).toEqual(request.title),
            () => expect(body.description).toEqual(request.description),
            () => expect(body.status).toEqual(request.status)
        ]);
    });

Then("the response should contain a list of test cases that belong to the current user",
    async function () {
        let response: APIResponse = this.scenarioData.get("response");
        let body: TestCaseResponse[] = await response.json();
        let currentUser: CurrentUserResponse = this.scenarioData.get("currentUser");

        expectMultiple([
            () => expect(body).not.toHaveLength(0),
            () => expect(body.every(testCaseResponse => testCaseResponse.owner_id === currentUser.id)).toBeTruthy()

        ]);
    }
);
