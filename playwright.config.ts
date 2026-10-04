import { defineConfig } from "@playwright/test";

const port = Number(process.env.QA_PORT ?? (Number(process.env.VE_PORT ?? 3092) + 8));
const external = process.env.QA_BASE_URL;
export default defineConfig({
  testDir: "./tests",
  outputDir: ".context/qa/test-results",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  reporter: [["list"], ["html", { outputFolder: ".context/qa/report", open: "never" }]],
  use: {
    baseURL: external ?? `http://127.0.0.1:${port}`,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "tablet", use: { viewport: { width: 820, height: 1180 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: external ? undefined : {
    command: `npm run start -- --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 30_000,
    env: { SITE_URL: "", CONTACT_EMAIL: "", RESUME_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "" },
  },
});
