import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  outputDir: 'test-results',
  fullyParallel: true,
  workers: 6,
  timeout: 60 * 1000,
  retries: 1,
  reporter: [['html', { outputFolder: 'test-results/html', open: 'never' }]],

  use: {
    headless: true, // forced headless in CI
    baseURL: 'https://www.saucedemo.com/',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },
  ],
});