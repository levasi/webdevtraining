import { expect, test } from "@playwright/test";

test("completed redirects anonymous users to login", async ({ page }) => {
  await page.goto("/completed");
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByText("Sign in").first()).toBeVisible();
});

test("read-later redirects anonymous users to login", async ({ page }) => {
  await page.goto("/read-later");
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByText("Sign in").first()).toBeVisible();
});
