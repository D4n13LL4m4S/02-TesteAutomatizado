import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://d4n13ll4m4s.github.io/02-TesteAutomatizado/',
    trace: 'on-first-retry',
    headless: true,       // garante execução silenciosa
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000, // timeout de cada ação
    navigationTimeout: 20000, // timeout de carregamento de página
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});