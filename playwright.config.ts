import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment-specific .env file
const env = process.env.TEST_ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `config/.env.${env}`) });

/**
 * Playwright Configuration
 * See: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // ─── Test Directory ──────────────────────────────────────────────────────────
  testDir: './tests',

  // ─── Global Timeout ──────────────────────────────────────────────────────────
  timeout: 60_000,          // 60s per test
  expect: {
    timeout: 10_000,        // 10s for assertions
  },

  // ─── Parallel Execution ──────────────────────────────────────────────────────
  fullyParallel: false,
  workers: 1,

  // ─── Retry Mechanism ─────────────────────────────────────────────────────────
  retries: process.env.CI ? 2 : 1,

  // ─── Fail Fast ───────────────────────────────────────────────────────────────
  forbidOnly: !!process.env.CI,

  // ─── Reporters ───────────────────────────────────────────────────────────────
  reporter: [
    ['html', {
      outputFolder: 'reports/html-report',
      open: 'never',
    }],
    ['json', { outputFile: 'reports/json-report/results.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['list'],  // Console output
  ],

  // ─── Shared Settings ─────────────────────────────────────────────────────────
  use: {
    // Base URL from environment
    baseURL: process.env.BASE_URL || 'https://www.kapruka.com',

    // Browser context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Extra HTTP headers
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },

    // Action timeout
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  // ─── Output Folder ───────────────────────────────────────────────────────────
  outputDir: 'reports/test-artifacts',

  // ─── Projects (Cross-Browser) ────────────────────────────────────────────────
  projects: [
    // Setup project for authenticated state
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },

    // ── Chromium ────────────────────────────────────────────────────────────────
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        //storageState: 'fixtures/auth/user-storage-state.json',
      },
      dependencies: ['setup'],
    },

    // // ── Firefox ─────────────────────────────────────────────────────────────────
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'fixtures/auth/user-storage-state.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // // ── WebKit (Safari) ─────────────────────────────────────────────────────────
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'fixtures/auth/user-storage-state.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // // ── Mobile Chrome ───────────────────────────────────────────────────────────
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
