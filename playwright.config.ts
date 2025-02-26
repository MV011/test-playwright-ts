import {defineConfig} from '@playwright/test';
import {defineBddConfig, cucumberReporter} from 'playwright-bdd';
import {config} from './src/support/config'

const testDir = defineBddConfig({
    features: 'src/features',
    steps: ['src/fixtures/fixtures.ts', 'src/steps/*.steps.ts'],
});

export default defineConfig({
    testDir,
    reporter: [cucumberReporter('html', {outputFile: 'cucumber-report/report.html'})],
    projects: [
        {
            name: 'ui',
            use: {
                baseURL: config.BASE_URL,
                browserName: 'chromium',
                launchOptions: config.launchOptions,
                trace: "retain-on-failure"
            },
        },
        {
            name: 'api',
            use: {
                baseURL: config.BASE_API_URI,
            }
        }
    ],
    timeout: 5000,
    workers: 2,


});