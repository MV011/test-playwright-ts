import {APIRequestContext, Page, TestInfo} from '@playwright/test';
import {PagesObject} from "../pages/pages";
import {PlaywrightApiClient} from "./api-client";

export class World {

    public pages: PagesObject
    public apiClient?: PlaywrightApiClient;
    public scenarioData: Map<string, any>

    constructor(
        public page: Page,
        public testInfo: TestInfo,
        public apiContext?: APIRequestContext,
    ) {
        this.pages = new PagesObject(page, page.context())
        this.scenarioData = new Map<string, any>();
        if (apiContext) {
            this.apiClient = new PlaywrightApiClient(apiContext);

        }
    }
}