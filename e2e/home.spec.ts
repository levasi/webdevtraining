import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /prepare for technical interviews/i,
    }),
  ).toBeVisible();
});

test("categories page is reachable", async ({ page }) => {
  await page.goto("/categories");
  await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
});
