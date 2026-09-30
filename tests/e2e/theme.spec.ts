import { expect, test } from "@playwright/test";

for (const route of ["/", "/funkce", "/pilot", "/kontakt", "/audit-ucetni-kancelare"]) {
  test(`graphite palette is consistent on ${route}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("ekonomos-theme", "dark"));
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(8, 12, 15)");
    await expect(page.locator(".bg-void").first()).toHaveCSS("background-color", "rgb(8, 12, 15)");
    await expect(page.locator(".btn-primary").first()).toHaveCSS("background-color", "rgb(242, 245, 247)");
    await expect(page.locator(".btn-primary").first()).toHaveCSS("color", "rgb(8, 12, 15)");
    await expect(page.locator(".hud-panel").first()).toHaveCSS("background-color", "rgb(16, 23, 28)");
    await expect(page.locator(".text-text-secondary").first()).toHaveCSS("color", "rgb(166, 178, 187)");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("assistant follows the dark surfaces and readable text palette", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ekonomos-theme", "dark"));
  await page.goto("/");
  await page.getByRole("button", { name: "Odmítnout volitelné" }).click();
  await page.getByRole("button", { name: "Otevřít asistenta EkonomOS" }).click();
  const panel = page.locator("#ekonomos-assistant-panel");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("background-color", "rgb(16, 23, 28)");
  await expect(page.getByLabel("Dotaz pro průvodce EkonomOS")).toHaveCSS("background-color", "rgb(24, 34, 41)");
  await expect(page.getByLabel("Dotaz pro průvodce EkonomOS")).toHaveCSS("color", "rgb(242, 245, 247)");
});

for (const route of ["/", "/funkce", "/pilot", "/kontakt", "/audit-ucetni-kancelare"]) {
  test(`light palette is consistent on ${route}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("ekonomos-theme", "light"));
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".btn-primary").first()).toHaveCSS("background-color", "rgb(0, 46, 93)");
    await expect(page.locator(".btn-primary").first()).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(page.locator(".hud-panel").first()).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".text-cyan").first()).toHaveCSS("color", "rgb(0, 46, 93)");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("light visualizations use navy rather than turquoise", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ekonomos-theme", "light"));
  await page.goto("/");
  await expect(page.locator('[class*="__scanBeam"]')).toHaveCSS("background-color", "rgb(23, 74, 120)");
  await expect(page.locator('[class*="__progress"] span')).toHaveCSS(
    "background-image", "linear-gradient(90deg, rgb(0, 46, 93), rgb(23, 74, 120))",
  );
  await expect(page.locator('#o-nas circle[stroke="var(--visual-signal)"]')).toHaveCSS("stroke", "rgb(0, 46, 93)");
  await expect(page.locator('#signaly [style*="--visual-signal-rgb"][style*="background"]').last()).toHaveCSS(
    "background-color", "rgba(0, 46, 93, 0.6)",
  );
});

test("light assistant uses neutral surfaces and navy actions", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ekonomos-theme", "light"));
  await page.goto("/");
  await page.getByRole("button", { name: "Odmítnout volitelné" }).click();
  await page.getByRole("button", { name: "Otevřít asistenta EkonomOS" }).click();
  await expect(page.locator("#ekonomos-assistant-panel")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator('[class*="__bubble"]').first()).toHaveCSS("background-color", "rgb(245, 245, 245)");
  await expect(page.getByRole("button", { name: "Odeslat dotaz" })).toHaveCSS("background-color", "rgb(0, 46, 93)");
});
