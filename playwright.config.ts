import { defineConfig } from "@playwright/test";

// Smoke tests only: every route renders, the provenance band is present,
// /cv has print styles. Run `npm run build` first; the web server here is
// the production server, on a dedicated port so a local `next dev` on 3000
// is never audited by mistake.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3199",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "npm run start -- --port 3199",
    url: "http://localhost:3199",
    reuseExistingServer: false,
  },
});
