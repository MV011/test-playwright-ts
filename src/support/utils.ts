import {Locator} from '@playwright/test';
import {DataTable} from "playwright-bdd";


/**
 * Waits for the specified locator to be visible on the page.
 *
 * @param {Locator} locator - The locator representing the element to wait for.
 * @return {Promise<boolean>} A promise that resolves to true if the locator is visible, otherwise false.
 */
export async function waitForLocatorToBeVisible(locator: Locator): Promise<boolean> {
    await locator.waitFor();
    return await locator.isVisible();
}

/**
 * Processes a data table and converts it into an array of maps with string keys and values.
 *
 * @param {any} dataTable - The data table input to be processed. It is expected to have a method `asMaps` for conversion.
 * @return {Array<Map<string, string>>} An array of maps where each map represents a row of the table with string keys and values.
 */
export function processDataTable(dataTable: DataTable): Array<Map<string, string>> {
    return dataTable.hashes().map(row => new Map(Object.entries(row)));
}

/**
 * Executes multiple assertions and collects all failures before reporting them
 * @param assertions An array of assertion functions to execute
 * @throws Error with all collected assertion failures if any assertions fail
 */
export function expectMultiple(assertions: Array<() => void>): void {
    const failures: string[] = [];

    for (const assertion of assertions) {
        try {
            assertion();
        } catch (error: unknown) {
            // Type-safe error handling
            const errorMessage = error instanceof Error
                ? error.message
                : String(error);

            failures.push(errorMessage);
        }
    }

    if (failures.length > 0) {
        throw new Error(`The following assertions failed:\n${failures.join('\n')}`);
    }
}