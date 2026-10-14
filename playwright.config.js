import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  use: { baseURL: 'http://127.0.0.1:5174', viewport: { width: 1440, height: 1100 } },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'edge', use: { browserName: 'chromium', channel: 'msedge' } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort --mode e2e',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
  },
})
