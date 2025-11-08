import { Page, expect, TestInfo } from '@playwright/test';

// Utility to wait for stable DOM
export async function waitForStableDOM(page: Page, timeout = 2000) {
  const stablePeriod = 100; 
  let lastHTML = '';
  let stableTime = 0;

  const start = Date.now();
  while (Date.now() - start < timeout) {
    const currentHTML = await page.content();
    if (currentHTML === lastHTML) {
      stableTime += 100;
      if (stableTime >= stablePeriod) return;
    } else {
      stableTime = 0;
      lastHTML = currentHTML;
    }
    await page.waitForTimeout(100);
  }
  console.warn('DOM did not stabilize within timeout');
}