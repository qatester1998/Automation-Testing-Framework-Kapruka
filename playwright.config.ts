import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment-specific .env file
const env = process.env.TEST_ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `config/.env.${env}`) });

export default defineConfig({

  // ─── Test Directory ──────────────────────────────────────────────────────────
  testDir: './tests',

  // ✅ ONLY THIS (no setup project)
  // globalSetup: './tests/global.setup.ts',

  // ─── Global Timeout ──────────────────────────────────────────────────────────
  timeout: 60_000,
  expect: {
    timeout: 10_000,
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
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/json-report/results.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['list'],
  ],

  // ─── Shared Settings ─────────────────────────────────────────────────────────
  use: {
    baseURL: process.env.BASE_URL || 'https://www.kapruka.com',

    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },

    actionTimeout: 60000,
    navigationTimeout: 60000,

    // ✅ APPLY AUTH HERE GLOBALLY
    storageState: 'auth.json',
  },

  // ─── Output Folder ───────────────────────────────────────────────────────────
  outputDir: 'reports/test-artifacts',

  // ─── Projects ────────────────────────────────────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, 'auth.json'),
      },
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