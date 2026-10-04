import { spawnSync } from "node:child_process";

const buildEnv = {
  ...process.env,
  // This Next version uses this documented CI capacity hint to limit build workers.
  CIRCLE_NODE_TOTAL: process.env.CIRCLE_NODE_TOTAL ?? "2",
  SITE_URL: "",
  CONTACT_EMAIL: "",
  RESUME_URL: "",
  VERCEL_PROJECT_PRODUCTION_URL: "",
};
const browsers = spawnSync("npx", ["playwright", "install", "chromium"], { stdio: "inherit" });
if (browsers.error) throw browsers.error;
if (browsers.status !== 0) process.exit(browsers.status ?? 1);
for (const [script, env] of [["typecheck", process.env], ["build", buildEnv], ["test:e2e", process.env]]) {
  const result = spawnSync("npm", ["run", script], { env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
