// tests/epam-client-work.spec.ts
//
// Purpose:
//  - Navigate to https://www.epam.com/
//  - Open the header "Services" menu
//  - Click "Explore Our Client Work"
//  - Verify that the "Client Work" text is visible on the page
//
// Notes:
//  - Created incrementally: imports + test skeleton. Full implementation added in subsequent edit.

import { test, expect } from '@playwright/test';

// Configure artifact capture to help debugging failing runs.
test.use({
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
});

test('EPAM | Services -> Explore Our Client Work shows "Client Work"', async ({ page }) => {
  // 1) Navigate to EPAM homepage and wait for network to be idle.
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

  // 2) Dismiss cookie/consent dialogs if present (non-fatal).
  try {
    await page.getByRole('button', { name: /accept|agree|got it|allow cookies?/i }).click({ timeout: 3000 });
  } catch (e) {
    // no cookie banner or different control; continue
  }

  // 3) Click "Services" in the header navigation.
  const headerNav = page.getByRole('navigation').first();
  await headerNav.getByRole('link', { name: /services/i }).click();

  // 4) Find and click "Explore Our Client Work".
  let exploreLocator = page.getByRole('link', { name: /explore our client work/i });
  if (await exploreLocator.count() === 0) {
    // fallback: sometimes it's not exposed as a link role or is rendered differently
    exploreLocator = page.getByText(/explore our client work/i).first();
  }

  // Click and wait for navigation to complete (if it navigates).
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
    exploreLocator.click(),
  ]);

  // 5) Verify "Client Work" text is visible on the page (case-insensitive).
  await expect(page.getByText(/Client Work/i)).toBeVisible({ timeout: 10_000 });
});
