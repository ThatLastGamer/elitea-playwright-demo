import { test, expect } from '@playwright/test';

// EPAM client work test file
// Test: EPAM: Services → Explore Our Client Work shows Client Work

test('EPAM: Services → Explore Our Client Work shows Client Work', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Open Services from header (hover then click fallback)
  const services = page.getByRole('link', { name: 'Services' });
  try {
    await services.hover();
  } catch {
    await services.click();
  }

  // Click the link to explore client work
  await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

  // Verify the "Client Work" text is visible on the page
  await expect(page.getByText('Client Work')).toBeVisible();
});
