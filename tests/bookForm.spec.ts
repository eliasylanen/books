import { expect, test } from '@playwright/test';

test('opens the dialog to add books', async ({ page }) => {
	await page.goto('/');

	const button = page.locator('.floating');

	await button.click();

	const dialog = page.locator('dialog').first();

	expect(await dialog.count()).toEqual(1);
});
