# Local preview verification

The website in this checkout was rebuilt from the original supplied brief. Ve's retained fleet checkpoints could not be applied: the recovery actions returned an interrupted final part and no combined result. No hidden checkpoint was imported manually.

## Checks completed

- `npm run typecheck` passed.
- `npm run build` passed, producing the homepage, four static case-study routes, icon, robots, sitemap, and social-image route.
- The production server returned HTTP 200 for all five pages and the crawl/image assets, and HTTP 404 for an unknown case-study slug.
- Browser checks found no horizontal overflow on the homepage or any of the four case studies at 820px, 390px, and 320px.
- Desktop and mobile production screenshots rendered without console warnings, errors, or failed requests.
- System layer selection, method tabs with ArrowRight keyboard navigation, and native lab disclosures changed their visible state correctly.
- Case-study navigation returned to the homepage's Work section correctly. A fresh production browser session reported no console warnings or errors during these interaction checks.
- Without a configured `SITE_URL`, rendered pages omitted canonical, absolute social-image, and Open Graph URL metadata. No invented public origin was emitted.
- Missing contact email and résumé values are not rendered as links. LinkedIn and GitHub use the URLs provided by the repository README.

## Limits

This is a local preview, not a public deployment. No formal Lighthouse, WCAG audit, configured-domain deployment, or cross-browser suite was run. Reduced-motion CSS and JavaScript-disabled content fallbacks are implemented, but those modes were not separately exercised in the browser.

The production preview is served at `http://127.0.0.1:55000` while its server process is running. The development command in the shared Ve settings uses the allocated workspace port.
