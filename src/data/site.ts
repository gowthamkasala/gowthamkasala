function publicOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value);
    return u.protocol === "https:" &&
      !["localhost", "127.0.0.1"].includes(u.hostname)
      ? u.origin
      : undefined;
  } catch {
    return undefined;
  }
}
function resumeLink(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    return new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}
const deploymentOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "Gowtham",
  title: "Gowtham — Product Builder & AI Product Engineer",
  description:
    "Gowtham builds products and systems across product, engineering, AI, infrastructure, and operations.",
  origin: publicOrigin(process.env.SITE_URL || deploymentOrigin),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.CONTACT_EMAIL ?? "")
    ? process.env.CONTACT_EMAIL
    : undefined,
  resume: resumeLink(process.env.RESUME_URL),
  linkedin: "https://linkedin.com/in/gowtham-kasala",
  github: "https://github.com/gowthamkasala",
};
