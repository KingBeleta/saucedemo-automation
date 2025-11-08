import { test as base, expect as baseExpect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend<{ page: Page }>({
  page: async ({ browser, contextOptions }, use, testInfo) => {
    // Create context with video recording
    const context = await browser.newContext({
      ...contextOptions,
      recordVideo: { dir: 'test-results/videos' },
      viewport: null,
      ignoreHTTPSErrors: true,
      javaScriptEnabled: true,
    });

    const page = await context.newPage();
    console.log(`Starting test: ${testInfo.title}`);

    // Clear cookies and cache before test
    const client = await context.newCDPSession(page);
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');

    await use(page);

    // Close context to finalize video
    await context.close();

    // Rename video file to match test name
    const video = page.video();
    if (video) {
      const oldPath = await video.path();

      // Sanitize test title for filesystem (remove invalid chars)
      const safeTitle = testInfo.title.replace(/[<>:"/\\|?*]+/g, '_');
      const newPath = path.join(path.dirname(oldPath), `${safeTitle}.webm`);

      try {
        fs.renameSync(oldPath, newPath);
        console.log(`Video saved: ${newPath}`);
      } catch (err) {
        console.error(`Failed to rename video: ${err}`);
      }
    }

    console.log(`Finished test: ${testInfo.title}`);
  },
});

export { baseExpect as expect };