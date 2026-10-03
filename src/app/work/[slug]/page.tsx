import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import Flow from "@/components/Flow";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(`${p.title} — Gowtham`, p.summary, `/work/${slug}`)
    : {};
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="case-page shell">
      <a href="/#work" className="back-link mono">
        ← ALL SELECTED WORK
      </a>
      <div className="case-heading">
        <span className="mono blue">
          CASE / {project.id} / {project.category.toUpperCase()}
        </span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </div>
      <div className="case-facts">
        <div>
          <span className="mono muted">SCOPE</span>
          <strong>{project.metric}</strong>
          <span>{project.metricLabel}</span>
        </div>
        <div>
          <span className="mono muted">PROJECT TYPE</span>
          <strong>{project.category}</strong>
        </div>
        <div>
          <span className="mono muted">LENS</span>
          <strong>Workflow → System</strong>
        </div>
      </div>
      <div className="case-body">
        <div className="case-aside mono">
          THE RECORD
          <br />
          <span>CONTEXT / REASONING / WORK</span>
        </div>
        <div>
          <section>
            <h2>Context</h2>
            <p>{project.context}</p>
          </section>
          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section className="case-system">
            <span className="mono blue">CONCEPTUAL WORKFLOW</span>
            <Flow items={project.flow} />
            <p className="diagram-caption">
              A conceptual map of the described workflow.
            </p>
          </section>
          <section>
            <h2>What I worked on</h2>
            <p>{project.role}</p>
          </section>
          <section>
            <h2>What the record supports</h2>
            <p>{project.outcome}</p>
          </section>
          <section>
            <h2>Design considerations</h2>
            {project.details.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </section>
        </div>
      </div>
      <Link href={`/work/${next.slug}`} className="next-case">
        <span className="mono">NEXT CASE / {next.id}</span>
        <strong>{next.title}</strong>
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
