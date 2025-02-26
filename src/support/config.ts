import { LaunchOptions } from '@playwright/test';
const launchOptions: LaunchOptions = {
  slowMo: 1,
  headless: false,
  tracesDir: 'traces/',
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--remote-debugging-port=9222'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const config = {
  browser: process.env.BROWSER ?? 'chromium',
  launchOptions,
  BASE_URL: process.env.BASEURL ?? 'http://localhost:5173',
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URI: process.env.APIURL ?? 'http://localhost:8000',
};
