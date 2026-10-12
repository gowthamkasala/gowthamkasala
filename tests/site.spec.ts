import { test as base, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  { slug: "sales-crm", heading: "Sales CRM", fact: "10–15 users" },
  { slug: "wedding-album-operations", heading: "Album operations", fact: "10–20 people" },
  { slug: "asset-management", heading: /5,000 assets/, fact: "~5,000" },
  { slug: "workflow-proposal-product", heading: "Workflow & proposal product", fact: "Internal systems" },
];

test("homepage identity and real section navigation", async ({ page }, info) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Follow the problem deeper.", { useInnerText: true });
  await expect(page.getByText("Product Builder & AI Product Engineer", { exact: true })).toBeVisible();
  for (const hash of ["work", "lab", "about", "contact"]) {
    const link = page.locator(`header nav a[href='/#${hash}']`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${hash}$`));
    await expect(page.locator(`#${hash}`)).toBeVisible();
  }
  await fits(page);
  await page.goto("/");
  await page.screenshot({ path: info.outputPath("homepage.png"), fullPage: false });
});

test("hero trace follows hover, focus and click and keeps one active layer", async ({ page }) => {
  await page.goto("/");
  const trace = page.getByRole("group", { name: "Follow a problem through connected layers" });
  const stages = trace.getByRole("button");
  await expect(stages).toHaveCount(6);
  await expect(trace.locator("button[aria-pressed='true']")).toHaveCount(1);
  for (let i = 0; i < 6; i++) {
    await stages.nth(i).focus();
    await expect(stages.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(trace.locator("button[aria-pressed='true']")).toHaveCount(1);
    await stages.nth(i).press("Enter");
    await expect(stages.nth(i)).toHaveAttribute("aria-pressed", "true");
  }
  await fits(page);
});

test("eight system layers open one at a time with the keyboard and keep visible focus", async ({ page }) => {
  await page.goto("/");
  const layers = page.locator("#system details");
  await expect(layers).toHaveCount(8);
  for (let i = 0; i < 8; i++) {
    const summary = layers.nth(i).locator("summary");
    await summary.focus();
    expect(await summary.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
    await summary.press("Enter");
    await expect(layers.nth(i)).toHaveAttribute("open", "");
    await expect(page.locator("#system details[open]")).toHaveCount(1);
    await expect(layers.nth(i).locator("p")).toBeVisible();
  }
  await expect(layers.last()).toContainText("Explore intent, memory, tools and action.");
  await fits(page);
});

test("career layers accumulate and earlier layers stay active", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const register = page.getByRole("group", { name: "Accumulated capabilities" });
  const stages = page.locator("#trajectory ol button");
  await expect(stages).toHaveCount(7);
  await expect(register.locator("[data-active='true']")).toHaveCount(1);
  // Capabilities accumulate: choosing an earlier layer never removes later ones.
  for (const [i, active] of [[3, 4], [6, 7], [1, 7]]) {
    await stages.nth(i).focus();
    await stages.nth(i).press("Enter");
    await expect(register.locator("[data-active='true']")).toHaveCount(active);
  }
  await expect(stages.first()).toHaveAccessibleName(/Explore Customer & support and earlier capabilities/);
  await fits(page);
});

test("operating-loop steps disclose with the keyboard", async ({ page }) => {
  await page.goto("/");
  const steps = page.locator("#method ol[aria-label='Working process'] details");
  await expect(steps).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    const step = steps.nth(i);
    await step.locator("summary").focus();
    await step.locator("summary").press("Enter");
    await expect(step).toHaveAttribute("open", "");
    await expect(step.locator("p")).toBeVisible();
    await fits(page);
    await step.locator("summary").press("Enter");
    await expect(step).not.toHaveAttribute("open");
  }
});

test("lab explorations disclose with the keyboard and label concept models", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#lab [aria-label='Concept model of a repository harness']")).toContainText("CONCEPT MODEL");
  const entries = page.locator("#lab details");
  await expect(entries).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    const entry = entries.nth(i);
    await entry.locator("summary").press("Enter");
    await expect(entry).toHaveAttribute("open", "");
    await expect(entry.locator("p")).toBeVisible();
    await fits(page);
    await entry.locator("summary").press("Enter");
    await expect(entry).not.toHaveAttribute("open");
  }
});

for (const item of cases) {
  test(`case dossier: ${item.slug}`, async ({ page }, info) => {
    const response = await page.goto(`/work/${item.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(item.heading, { useInnerText: true });
    await expect(page.locator("article")).toContainText(item.fact);
    for (const heading of ["Context", "The problem", "My contribution"]) {
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }
    // Models are labelled as concept models, and no evidence gallery appears without real artifacts.
    await expect(page.getByText("CONCEPT MODEL", { exact: true })).toBeVisible();
    await expect(page.getByRole("region", { name: "Project evidence" })).toHaveCount(0);
    await fits(page);
    await page.getByRole("link", { name: "← All selected work" }).press("Enter");
    await expect(page).toHaveURL(/\/#work$/);
    await page.goBack();
    await page.locator(".next-case").press("Enter");
    await expect(page).not.toHaveURL(new RegExp(`${item.slug}$`));
    if (item.slug === "asset-management") {
      await page.goto(`/work/${item.slug}`);
      await page.screenshot({ path: info.outputPath("asset-management.png"), fullPage: false });
    }
  });
}

test("global navigation from a dossier returns to homepage sections", async ({ page }) => {
  await page.goto("/work/sales-crm");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work", exact: true }).press("Enter");
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { name: /Working systems\./ })).toBeVisible();
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
  await expect(page.locator("a[href^='mailto:']")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Résumé/ })).toHaveCount(0);
  // Without an email the header call to action points at the contact links.
  await expect(page.locator("header nav a[href='/#contact']")).toBeVisible();
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
  // No published notes means no notes section, no placeholder and no note links.
  await expect(page.locator("#notes")).toHaveCount(0);
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
    await expect(noJs.locator("#system details")).toHaveCount(8);
    const firstLayer = noJs.locator("#system details").first();
    await firstLayer.locator("summary").press("Enter");
    await expect(firstLayer).toHaveAttribute("open", "");
    await expect(firstLayer).toContainText("Listen to the people doing the work.");
    await expect(noJs.locator("#trajectory")).toContainText("Still carries:");
    await expect(noJs.locator("#method")).toContainText("Observe");
    await fits(noJs);
    const response = await noJs.goto(new URL("/work/sales-crm", page.url()).href);
    expect(response?.status()).toBe(200);
    await expect(noJs.getByRole("heading", { level: 1 })).toHaveText("Sales CRM");
  } finally { await context.close(); }
});

test("home and case pages have no detectable accessibility violations", async ({ page }) => {
  for (const path of ["/", "/work/asset-management"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map(v => `${path} ${v.id}: ${v.nodes.length} node(s)`), "axe violations").toEqual([]);
  }
});
