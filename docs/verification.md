# Website verification

The working website was rebuilt directly from the supplied brief after the original fleet handoff failed. Its late partial result reported nine completed assignments and one interrupted QA assignment, but contained zero changed paths. Applying that result wrote no files. Worker reports of isolated checks did not certify the assembled website.

## Checks completed on 2026-10-04

- TypeScript checking and the Next.js production build passed.
- The automated Chromium suite passed all 36 checks against https://gowthamkasala.com: 12 cases each at desktop (1280px), tablet (820px), and mobile (390px).
- Coverage includes navigation, eight system controls, seven keyboard-operated method tabs, five lab disclosures, four case-study routes, the expected unknown-route 404, metadata, contact links, reduced motion, and JavaScript-disabled reading paths.
- Layout checks found no horizontal overflow in tested pages and interaction states. Unexpected browser errors fail the suite; the intentional missing-route 404 is narrowly excluded.
- Earlier local checks covered 320px layouts and absent production/contact settings. Missing email and résumé settings produce no fabricated links.

## Checks completed on 2026-10-12 (local, site-updates redesign)

- `npm test` passes end to end: ESLint (`--max-warnings 0`), TypeScript, production build, and 60 Chromium checks (15 tests at 1280px, 820px, 390px and 320px).
- The suite was rewritten for the redesign: hero trace, eight exclusive system layers, accumulating career layers, five operating-loop disclosures, two lab disclosures, four case dossiers (no evidence gallery without real artifacts), 404, truthful metadata and contact values, reduced motion, JavaScript-disabled reading paths, and an axe scan (WCAG 2.0/2.1 A and AA) of the home page and a case page.
- The production run above predates the redesign and describes the earlier site.

## Run the checks

```sh
npm ci
npm test
```

`npm test` (also `npm run verify`) installs Chromium if needed, checks types, builds with optional site/contact settings unset, then starts an isolated production server and runs the browser suite. Build and browser concurrency are limited to reduce memory use.

To check an existing deployment instead, use its primary origin:

```sh
QA_BASE_URL=https://gowthamkasala.com npm run verify
```

`npm run test:e2e` runs only the browser suite. `QA_PORT` selects the local production port. Reports, failure traces and screenshots are saved beneath `.context/qa/`; the HTML report is `.context/qa/report/index.html`.

## Limits

The suite exercises Chromium only. It is not a formal Lighthouse or WCAG audit, and does not certify every browser or viewport. The original fleet remains partial; these checks verify the independently recovered implementation.
