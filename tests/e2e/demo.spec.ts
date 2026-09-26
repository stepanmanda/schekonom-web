import { expect, test, type Page } from "@playwright/test";

const marketingRoutes = [
  "/",
  "/funkce",
  "/pilot",
  "/caste-dotazy",
  "/zabezpeceni-dat",
  "/o-nas",
  "/kontakt",
  "/modul-ucetnictvi",
  "/modul-mzdy",
  "/modul-dane",
  "/modul-cz-de",
  "/roadmap",
  "/soukromi",
  "/podminky",
  "/cookies",
];

const demoProfiles = [
  { card: "Klient účetní firmy", surname: "klient" },
  { card: "Specialista CZ/DE daní", surname: "de_specialista" },
  { card: "Mzdová účetní", surname: "mzdy" },
];

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("homepage renders and switches theme", async ({ page }) => {
  const errors = collectRuntimeErrors(page);

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Doklady projdou/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Prohlédnout živé demo/i }),
  ).toBeVisible();

  const initialTheme = await page.locator("html").getAttribute("data-theme");
  const themeToggle = page.getByRole("button", {
    name: /Přepnout na .* motiv/i,
  });
  if ((await themeToggle.count()) === 0) {
    await page.getByRole("button", { name: "Otevřít menu" }).click();
  }
  await themeToggle.click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    initialTheme ?? "",
  );
  expect(errors).toEqual([]);
});

for (const route of marketingRoutes) {
  test(`${route} renders without runtime errors or horizontal overflow`, async ({
    page,
  }) => {
    const errors = collectRuntimeErrors(page);
    const response = await page.goto(route);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1").first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

for (const profile of demoProfiles) {
  test(`${profile.card} opens and restores its portal workspace`, async ({
    page,
  }) => {
    const errors = collectRuntimeErrors(page);

    await page.goto("/prihlaseni");
    await page
      .getByRole("button", { name: new RegExp(profile.card, "i") })
      .click();
    await expect(page).toHaveURL(/\/portal\/prehled$/);
    await expect(page.locator("main").getByRole("heading").first()).toBeVisible();
    await expect(page.getByText(/ACTIVE PROFILE/i)).toBeVisible();
    await expect(page.getByText(profile.surname, { exact: true })).toBeVisible();

    await page.reload();
    await expect(page).toHaveURL(/\/portal\/prehled$/);
    await expect(page.getByText(profile.surname, { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("protected portal redirects an anonymous visitor", async ({ page }) => {
  await page.goto("/portal/prehled");
  await expect(page).toHaveURL(/\/prihlaseni$/);
});

test("contact form confirms a successful endpoint submission", async ({
  page,
}) => {
  await page.route("https://forms.test/submit", async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: "Testovací kontakt",
      email: "kontakt@example.cz",
      source: "ekonomos.velyos.cz",
    });
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await page.goto("/kontakt");
  await page.getByLabel("Jméno *").fill("Testovací kontakt");
  await page.getByLabel("email *").fill("kontakt@example.cz");
  await page.getByLabel("Zpráva *").fill("Prosím o ukázku produktu.");
  await page.getByRole("button", { name: "Odeslat" }).click();

  await expect(page.getByText(/Děkujeme\. Ozveme se vám/i)).toBeVisible();
});

test("contact form attempts mail fallback when the endpoint fails", async ({
  page,
}) => {
  await page.route("https://forms.test/submit", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/kontakt");
  await page.getByLabel("Jméno *").fill("Fallback kontakt");
  await page.getByLabel("email *").fill("fallback@example.cz");
  await page.getByLabel("Zpráva *").fill("Endpoint není dostupný.");
  await page.getByRole("button", { name: "Odeslat" }).click();

  await expect(
    page
      .getByRole("status")
      .filter({ hasText: /Otevřeli jsme e-mailovou aplikaci/i }),
  ).toBeVisible();
  const fallbackUrl = await page
    .getByRole("link", { name: /napište nám přímo/i })
    .getAttribute("href");
  expect(fallbackUrl).toContain("mailto:stepan@velyos.cz");
  expect(decodeURIComponent(fallbackUrl ?? "")).toContain("Fallback kontakt");
});
