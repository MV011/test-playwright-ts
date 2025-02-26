import {test as base, createBdd} from 'playwright-bdd';
import {World} from "../support/world";
import {config} from "../support/config";

export const test =
    base.extend<{ world: World }>(
        {
            world: async ({$tags, page, request}, use, testInfo) => {

                let world: World;

                if ($tags.includes("@Ignore")) {
                    testInfo.skip();
                }
                if($tags.includes("@UI")) {
                    await page.goto(config.BASE_URL);
                    world = new World(page, testInfo);
                }
                else {
                    world = new World(page,testInfo,request);
                }
                await use(world);
            },
        });

export const {Given, When, Then, Before, After} = createBdd(test, {worldFixture: 'world'});