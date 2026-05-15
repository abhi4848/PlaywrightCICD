const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'PlaywrightTest',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  workers: 2,
  reporter: [
    ['list'],
    ['github'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['blob', { outputFolder: 'blob-report' }],
  ],
  use: {
    actionTimeout: 0,
    navigationTimeout: 30000,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

module.exports = config;
