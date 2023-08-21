import { expect, test } from '@playwright/test';

test('initial view has 20 books', async ({ page }) => {
	await page.goto('/');

	await page.waitForSelector('.book');

	const bookElems = await page.locator('.book').count();
	expect(bookElems).toEqual(20);
});
