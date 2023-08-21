import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	outputDir: 'tests/results',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 1,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',
	use: {
		baseURL: `http://localhost:5173`,
		ignoreHTTPSErrors: true,
		screenshot: process.env.CI ? 'only-on-failure' : 'off',
		video: process.env.CI ? 'retain-on-failure' : 'off',
		trace: process.env.CI ? 'retain-on-failure' : 'off',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
	],

	webServer: {
		command: 'npm start',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
	},
});
