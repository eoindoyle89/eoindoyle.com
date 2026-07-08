import { expect, test } from "@playwright/test";
import { routes } from "../src/lib/site";

const machineRoutes: { path: string; contentType: string; marker: string }[] = [
  { path: "/feed.xml", contentType: "application/rss+xml", marker: "<?xml" },
  { path: "/llms.txt", contentType: "text/plain", marker: "# Eoin Doyle" },
  { path: "/robots.txt", contentType: "text/plain", marker: "ClaudeBot" },
  { path: "/sitemap.xml", contentType: "application/xml", marker: "<urlset" },
  {
    path: "/manifest.webmanifest",
    contentType: "application/manifest+json",
    marker: '"icons"',
  },
];

for (const route of routes) {
  test(`${route} renders with the provenance band`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const band = page.locator("footer");
    await expect(band).toBeVisible();
    await expect(band).toContainText("built");
    await expect(band).toContainText("agent");
    await expect(band).toContainText("view source");
    // Provenance is real data (ADR-005): the commit hash must be present
    // and link to the commit. Both CI and local builds have git available.
    await expect(
      band.locator('a[href*="/commit/"]', { hasText: /^[0-9a-f]{7}$/ })
    ).toBeVisible();
  });
}

for (const { path, contentType, marker } of machineRoutes) {
  test(`${path} serves with the right content type`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(contentType);
    expect((await response.text()).includes(marker)).toBe(true);
  });
}

test("unknown paths get the custom 404 with the provenance band", async ({
  page,
}) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("path not found");
  await expect(page.locator("footer")).toContainText("view source");
});

test("/cv print styles strip the site chrome", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header")).toBeHidden();
  await expect(page.locator("footer")).toBeHidden();
  await expect(page.locator("h1")).toBeVisible();
});
