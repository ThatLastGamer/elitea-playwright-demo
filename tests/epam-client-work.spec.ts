// tests/epam-client-work.spec.ts
// Purpose: Playwright test to verify the "Client Work" text is visible after navigating from EPAM homepage -> Services -> Explore Our Client Work.
//
// Note: Initial file created with imports and test skeleton. Body will be added in a separate commit for incremental write.

import { test, expect } from '@playwright/test';

test.describe('EPAM website - Client Work visibility', () => {
  test('Navigate to Services -> Explore Our Client Work -> verify Client Work visible', async ({ page }) => {
    // 1) Navigate to the EPAM homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    // 2) Ensure the main navigation is visible
    const nav = page.getByRole('navigation').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });

    // 3) Click the "Services" link (handle link or button variants)
    const servicesLink = nav.getByRole('link', { name: 'Services' });
    if (await servicesLink.count() > 0) {
      await servicesLink.first().click();
    } else {
      await nav.getByText('Services').first().click();
    }
    await page.waitForLoadState('networkidle');

    // 4) Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await expect(exploreLink).toBeVisible({ timeout: 10_000 });
    await exploreLink.first().click();

    // 5) Verify the "Client Work" text is visible on the destination page
    const clientWork = page.getByText(/Client Work/i);
    await expect(clientWork).toBeVisible({ timeout: 20_000 });

    // Optional: a sanity check on the URL
    await expect(page).toHaveURL(/client[-_ ]?work|client-work/i);
  });
});
