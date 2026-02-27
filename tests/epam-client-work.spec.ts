import { test, expect, Page } from '@playwright/test';

test('EPAM: navigate Services -> Explore Our Client Work and verify Client Work text', async ({ page }) => {
  // 1. Navigate to the EPAM homepage
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

  // 2. Select "Services" from the header menu
  await page.getByRole('link', { name: /Services/i }).click();

  // 3. Click the "Explore Our Client Work" link
  // Handle the possibility that the link opens a new tab/window
  let targetPage: Page = page;
  const [popup] = await Promise.all([
    page.waitForEvent('popup').catch(() => null),
    page.getByRole('link', { name: /Explore Our Client Work/i }).click(),
  ]);

  if (popup) {
    targetPage = popup;
    await targetPage.waitForLoadState('load');
  } else {
    // If no popup, wait for navigation in the same page
    await page.waitForLoadState('load');
  }

  // 4. Verify that the "Client Work" text is visible on the page
  await expect(targetPage.getByText(/Client Work/i)).toBeVisible();
});
