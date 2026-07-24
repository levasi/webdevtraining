import { expect, test } from "@playwright/test";

const publicPages: Array<{
  path: string;
  heading?: string | RegExp;
  text?: string | RegExp;
}> = [
  { path: "/", heading: /prepare for technical interviews/i },
  { path: "/categories", heading: "Categories" },
  { path: "/challenges", heading: "Coding Challenges" },
  { path: "/quiz", heading: "Quiz Mode" },
  { path: "/docs", heading: "Docs" },
  { path: "/resources", heading: "Resources" },
  { path: "/chat", heading: "Ask AI" },
  { path: "/login", text: "Sign in" },
  { path: "/register", text: "Create account" },
];

for (const pageCase of publicPages) {
  test(`public page ${pageCase.path} loads`, async ({ page }) => {
    await page.goto(pageCase.path);
    if (pageCase.heading) {
      await expect(
        page.getByRole("heading", { name: pageCase.heading }),
      ).toBeVisible();
    } else if (pageCase.text) {
      await expect(page.getByText(pageCase.text).first()).toBeVisible();
    }
  });
}

test("seeded category page loads", async ({ page }) => {
  await page.goto("/categories/javascript");
  await expect(page.getByRole("heading", { name: "JavaScript" })).toBeVisible();
});
