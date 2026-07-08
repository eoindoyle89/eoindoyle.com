import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/now",
  "/work",
  "/builds",
  "/consulting",
  "/cv",
  "/colophon",
];

for (const route of routes) {
  test(`${route} renders with the provenance band`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const band = page.locator("footer");
    await expect(band).toBeVisible();
    await expect(band).toContainText("built");
    await expect(band).toContainText("view source");
  });
}

test("/cv print styles strip the site chrome", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header")).toBeHidden();
  await expect(page.locator("footer")).toBeHidden();
  await expect(page.locator("h1")).toBeVisible();
});
