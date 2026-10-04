import { test as base, expect, type Page } from "@playwright/test";

const test = base.extend<{ browserHealth: void }>({
  browserHealth: [async ({ page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      // The explicit unknown-route test deliberately receives a document-level 404.
      const expected404 = message.location().url.includes("/work/not-a-real-case")
        && /status of 404/.test(message.text());
      if (message.type() === "error" && !expected404) errors.push(message.text());
    });
    page.on("requestfailed", request => {
      const reason = request.failure()?.errorText;
      // Navigation can intentionally cancel prefetches; other failed requests are defects.
      if (reason && reason !== "net::ERR_ABORTED") errors.push(`${request.url()}: ${reason}`);
    });
    await use();
    expect(errors, "No console, hydration, or network errors").toEqual([]);
  }, { auto: true }],
});

async function fits(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
}
const cases = [
  { slug: "sales-crm", title: "Sales CRM", evidence: "10–15" },
  { slug: "wedding-album-operations", title: "Album operations", evidence: "10–20" },
  { slug: "asset-management", title: "Asset management", evidence: "~5,000" },
  { slug: "workflow-proposal-product", title: "Workflow & proposal product", evidence: "Workflow" },
];

test("homepage identity and real section navigation", async ({ page }, info) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Follow the problem deeper.", { useInnerText: true });
  await expect(page.getByText("Product Builder & AI Product Engineer", { exact: true })).toBeVisible();
  for (const hash of ["work", "lab", "about", "contact"]) {
    const link = page.locator(`nav a[href='/#${hash}']`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${hash}$`));
    await expect(page.locator(`#${hash}`)).toBeVisible();
  }
  await fits(page);
  await page.goto("/");
  await page.screenshot({ path: info.outputPath("homepage.png"), fullPage: false });
});

test("system layers respond to keyboard and retain visible focus", async ({ page }) => {
  await page.goto("/");
  const layers = page.locator("#system button");
  await expect(layers).toHaveCount(8);
  for (let i = 0; i < 8; i++) {
    await layers.nth(i).press("Enter");
    await expect(layers.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#system button[aria-pressed='true']")).toHaveCount(1);
    await expect(layers.nth(i)).toBeFocused();
  }
  await expect(page.getByRole("heading", { name: "Rethink what the product can become.", exact: true })).toBeVisible();
  expect(await layers.last().evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
  await fits(page);
});

test("working-process tabs support arrows, Home, End and wrap", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(7);
  await tabs.first().press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(1)).toBeFocused();
  await tabs.nth(1).press("End");
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await tabs.last().press("ArrowRight");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await tabs.first().press("ArrowLeft");
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await tabs.last().press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await fits(page);
});

test("all five research entries disclose with the keyboard", async ({ page }) => {
  await page.goto("/");
  const entries = page.locator("#lab details");
  await expect(entries).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    const entry = entries.nth(i);
    await entry.locator("summary").press("Enter");
    await expect(entry).toHaveAttribute("open", "");
    await expect(entry.locator(".lab-question")).toBeVisible();
    await fits(page);
    await entry.locator("summary").press("Enter");
    await expect(entry).not.toHaveAttribute("open");
  }
});

for (const item of cases) {
  test(`case dossier: ${item.slug}`, async ({ page }, info) => {
    const response = await page.goto(`/work/${item.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.title);
    await expect(page.locator(".case-facts")).toContainText(item.evidence);
    for (const heading of ["Context", "The problem", "What I worked on", "What the record supports"]) {
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }
    await fits(page);
    const nextLink = page.locator(".next-case");
    await nextLink.press("Enter");
    await expect(page).not.toHaveURL(new RegExp(`${item.slug}$`));
    if (item.slug === "asset-management") {
      await page.goto(`/work/${item.slug}`);
      await page.screenshot({ path: info.outputPath("asset-management.png"), fullPage: false });
    }
  });
}

test("global navigation from a dossier returns to homepage sections", async ({ page }) => {
  await page.goto("/work/sales-crm");
  await page.getByRole("link", { name: "01 Work", exact: true }).press("Enter");
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { name: "Working systems. Real constraints.", exact: true })).toBeVisible();
});

test("an unknown case returns a real 404 with a usable home link", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-case");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("This page isn’t");
  await page.getByRole("link", { name: /Back to Gowtham/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Follow the problem deeper.", { useInnerText: true });
});

test("metadata and missing contact values remain truthful", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Gowtham — Product Builder & AI Product Engineer");
  await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /Gowtham builds products and systems/);
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Résumé/ })).toHaveCount(0);
  await expect(page.locator("#contact a[href='https://linkedin.com/in/gowtham-kasala']")).toBeVisible();
  await expect(page.locator("#contact a[href='https://github.com/gowthamkasala']")).toBeVisible();
  if (process.env.QA_BASE_URL) {
    const host = new URL(process.env.QA_BASE_URL).origin;
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(host);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", `${host}/social-image`);
  } else {
    await expect(page.locator("link[rel='canonical']")).toHaveCount(0);
    await expect(page.locator("meta[property='og:url']")).toHaveCount(0);
  }
  await expect(page.locator("#notes")).toContainText("Research notes coming soon.", { useInnerText: true });
  await expect(page.locator("a[href^='/notes/']")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/House of Celebrations|photobooth|event-services|LED-wall services/i);
});

test("reduced-motion and JavaScript-disabled reading paths work", async ({ page, browser }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  try {
    const noJs = await context.newPage();
    await noJs.goto(page.url());
    // Playwright's default text extractor skips noscript nodes, even in a no-JS context.
    // Target the actual rendered children instead.
    await expect(noJs.locator("#system noscript ul")).toContainText("Rethink what the product can become.");
    await expect(noJs.locator("#method noscript ul")).toContainText("What should change next?");
    const firstLab = noJs.locator("#lab details").first();
    await firstLab.locator("summary").press("Enter");
    await expect(firstLab).toHaveAttribute("open", "");
    await fits(noJs);
    const response = await noJs.goto(new URL("/work/sales-crm", page.url()).href);
    expect(response?.status()).toBe(200);
    await expect(noJs.getByRole("heading", { level: 1 })).toHaveText("Sales CRM");
  } finally { await context.close(); }
});
