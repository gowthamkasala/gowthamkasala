import Link from "next/link";
export default function NotFound() {
  return (
    <div className="not-found shell">
      <span className="mono blue">404 / OUTSIDE THE MAP</span>
      <h1>
        This page isn’t
        <br />
        on the workbench.
      </h1>
      <p>Return to the site to explore the work and current research.</p>
      <Link href="/" className="text-link">
        Back to Gowtham’s workbench ↗
      </Link>
    </div>
  );
}
