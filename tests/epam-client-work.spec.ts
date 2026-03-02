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
  // NAVIGATION_PLACEHOLDER
});
