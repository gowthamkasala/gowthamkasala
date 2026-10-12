# Adding real project evidence

Place approved, appropriately sanitized artifacts in `public/evidence/` and add an entry keyed by the existing project slug in `src/data/evidence.ts`. Empty arrays and missing entries render nothing. Local root-relative paths or HTTPS URLs are supported.

The typed schema supports screenshots (including crops/sanitized UI), photos, diagrams or architecture sketches/system maps, documents, and before/after comparisons. Provide meaningful alt text and a concise caption; set `sanitized: true` when an artifact was sanitized. Comparison entries contain `before` and `after` image paths and alt text. Document entries use a real URL, title and caption.

Workflow models in the dossiers are separately labelled concept models. Never substitute an invented application screenshot or diagram for a real artifact. Check the final page at desktop/mobile widths and validate every added URL before publishing.
