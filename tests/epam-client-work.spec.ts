// tests/epam-client-work.spec.ts
// Purpose: Playwright test to verify the "Client Work" text is visible after
// navigating from the EPAM homepage -> Services -> Explore Our Client Work.
//
// Notes:
// - Uses role-based selectors for better resilience and accessibility alignment.
// - Includes inline comments to explain each step so the file is ready-to-commit.

import { test, expect } from '@playwright/test';

// Group related tests under a describe block for clarity in reports
test.describe('EPAM website - Client Work visibility', () => {
  // Single test that follows the user journey described in the scenario
  test('Navigate to Services -> Explore Our Client Work -> verify Client Work visible', async ({ page }) => {
    // 1) Navigate to the EPAM homepage
    // Using `domcontentloaded` speeds up the initial step while the following
    // `networkidle` wait helps ensure interactive elements are ready.
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    // 2) Locate the primary navigation and ensure it's visible
    // Using getByRole('navigation') targets the main nav element for accessibility
    const nav = page.getByRole('navigation').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });

    // 3) Click the "Services" entry within the header navigation
    // Prefer role=link for anchors; fallback to text if it's not a link
    const servicesLink = nav.getByRole('link', { name: 'Services' });
    if (await servicesLink.count() > 0) {
      await servicesLink.first().click();
    } else {
      // Fallback: some sites use buttons or plain text for menu triggers
      await nav.getByText('Services').first().click();
    }

    // Wait for any menu or page transition to settle
    await page.waitForLoadState('networkidle');

    // 4) Click the "Explore Our Client Work" link
    // Use a case-insensitive regex to be robust against minor text changes
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await expect(exploreLink).toBeVisible({ timeout: 10_000 });
    await exploreLink.first().click();

    // 5) Verify the "Client Work" text is visible on the resulting page
    // The heading may be a part of a larger element, so use a case-insensitive match
    const clientWork = page.getByText(/Client Work/i);
    await expect(clientWork).toBeVisible({ timeout: 20_000 });

    // Optional: verify the URL looks like a client work page (sanity check)
    await expect(page).toHaveURL(/client[-_ ]?work|client-work/i);
  });
});
