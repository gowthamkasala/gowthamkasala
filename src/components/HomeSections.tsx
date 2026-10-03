import Link from "next/link";
import { projects } from "@/data/projects";
import { experiments, principles, career, noteThemes } from "@/data/research";
import { site } from "@/data/site";
import SectionLabel from "./SectionLabel";
import SystemExplorer from "./SystemExplorer";
import Method from "./Method";
import Flow from "./Flow";
export function SystemSection() {
  return (
    <section id="system" className="section shell">
      <SectionLabel number="01">SYSTEM MODEL</SectionLabel>
      <div className="section-intro">
        <h2>
          I don’t sit neatly
          <br />
          between the boxes.
        </h2>
        <p>
          That’s the point. I follow a problem through the layers it takes to
          solve it—from the person using the product to the systems underneath.
        </p>
      </div>
      <SystemExplorer />
    </section>
  );
}
export function WorkSection() {
  return (
    <section id="work" className="section shell">
      <SectionLabel number="02">SELECTED WORK</SectionLabel>
      <div className="section-intro">
        <h2>
          Working systems.
          <br />
          <span className="muted">Real constraints.</span>
        </h2>
        <p>
          Internal tools, operational workflows, and product systems. The useful
          question is what people needed—and what had to work.
        </p>
      </div>
      <div className="work-index">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="work-row">
            <span className="work-no mono">CASE / {p.id}</span>
            <div className="work-name">
              <span className="mono muted">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
            <div className="work-metric">
              <strong>{p.metric}</strong>
              <span>{p.metricLabel}</span>
            </div>
            <span className="work-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
      <p className="section-foot mono">
        THE INTERESTING PART IS THE SYSTEM, NOT THE TECHNOLOGY TAGS.
      </p>
    </section>
  );
}
export function MethodSection() {
  return (
    <section id="method" className="section shell">
      <SectionLabel number="03">HOW I WORK</SectionLabel>
      <div className="section-intro">
        <h2>
          Make it real.
          <br />
          See what happens.
        </h2>
        <p>
          I like turning ideas into systems. The process is deliberate; the path
          rarely stays perfectly straight.
        </p>
      </div>
      <Method />
    </section>
  );
}
export function TrajectorySection() {
  return (
    <section id="trajectory" className="section shell">
      <SectionLabel number="04">CAREER TRAJECTORY</SectionLabel>
      <div className="section-intro">
        <h2>
          More layers.
          <br />
          More ownership.
        </h2>
        <p>
          My career didn’t move from one box to another. It accumulated layers.
          Earlier capabilities stayed useful as the problems became more
          complex.
        </p>
      </div>
      <ol className="trajectory">
        {career.map((stage, i) => (
          <li key={stage}>
            <span className="mono muted">0{i + 1}</span>
            <h3>{stage}</h3>
            <div
              className="career-layer-stack"
              aria-label={`${i + 1} accumulated capability layers`}
            >
              {career.map((name, j) => (
                <span
                  key={name}
                  className={j <= i ? "filled" : ""}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="mono trajectory-status">
              {i === 6 ? "EXPLORING" : "ACCUMULATED"}
            </span>
          </li>
        ))}
      </ol>
      <p className="section-foot mono">
        EARLIER CAPABILITIES STAY IN THE SYSTEM.
      </p>
    </section>
  );
}
export function LabSection() {
  return (
    <section id="lab" className="lab-section section">
      <div className="shell">
        <SectionLabel number="05">THE LAB</SectionLabel>
        <div className="section-intro">
          <h2>
            Open questions.
            <br />
            Working experiments.
          </h2>
          <p>Serious research, at different stages of development.</p>
        </div>
        <div className="lab-list">
          {experiments.map((e) => (
            <details className="lab-entry" key={e.id}>
              <summary>
                <span className="mono lab-id">LAB / {e.id}</span>
                <div>
                  <span className="mono muted">{e.domain}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                </div>
                <span className="status mono">{e.status}</span>
                <span className="expand-sign" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="lab-detail">
                <p className="lab-question">{e.question}</p>
                <div className="lab-notes">
                  {e.notes.map((n) => (
                    <p key={n}>{n}</p>
                  ))}
                  <p className="mono diagram-caption">
                    CONCEPTUAL MODEL / EXPLORATION
                  </p>
                  <Flow items={e.flow} />
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function NotesSection() {
  return (
    <section id="notes" className="section shell">
      <SectionLabel number="06">FIELD NOTES</SectionLabel>
      <div className="notes-grid">
        <div>
          <h2>
            Notes from
            <br />
            the workbench.
          </h2>
          <p className="section-description">
            Thinking in public, when there is something useful to share.
          </p>
        </div>
        <div className="notes-ledger">
          <span className="mono muted">PUBLISHED NOTES</span>
          <p className="notes-empty">
            Research notes
            <br />
            coming soon.
          </p>
          <div className="ledger-line" />
          <span className="mono muted">AREAS OF EXPLORATION</span>
          <ul>
            {noteThemes.map((t) => (
              <li key={t}>
                {t}
                <span aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export function PrinciplesSection() {
  return (
    <section id="principles" className="section shell">
      <SectionLabel number="07">PRINCIPLES</SectionLabel>
      <div className="principles-grid">
        <h2>
          A few things
          <br />I come back to.
        </h2>
        <ol>
          {principles.map(([title, body], i) => (
            <li key={title}>
              <span className="mono blue">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function AboutSection() {
  return (
    <section id="about" className="section shell">
      <SectionLabel number="08">ABOUT / GOWTHAM</SectionLabel>
      <div className="about-grid">
        <h2>
          I kept following
          <br />
          problems deeper
          <br />
          into the system.
        </h2>
        <div className="about-copy">
          <p>
            I didn’t enter technology through one perfectly defined role. I
            started close to customers and support, where I saw how products
            actually fail in the real world.
          </p>
          <p>
            That led me into testing, product, internal systems, development,
            infrastructure, and eventually AI. The progression was about owning
            more of the problem.
          </p>
          <p>
            I enjoy understanding why something should exist, designing how it
            should work, figuring out how to build it, and seeing what reality
            says.
          </p>
          <p className="about-pull">I like turning ideas into systems.</p>
          <div className="about-context">
            <span className="mono muted">PROFESSIONAL CONTEXT</span>
            <p>
              Work across the Huemn / ve AI ecosystem, spanning product,
              operations, internal tools, development, infrastructure, and
              AI-related systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ContactSection() {
  const json = site.origin
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        url: site.origin,
        sameAs: [site.linkedin, site.github],
      }
    : null;
  return (
    <section id="contact" className="contact-section">
      <div className="shell">
        <SectionLabel number="09">CONTINUE THE CONVERSATION</SectionLabel>
        <h2>
          Let’s build something
          <br />
          <em>interesting.</em>
        </h2>
        <div className="contact-bottom">
          <p>
            Products. AI. Systems.
            <br />
            Strange ideas worth testing.
          </p>
          <div className="contact-links">
            {site.email && (
              <a href={`mailto:${site.email}`}>
                Email <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href={site.linkedin}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href={site.github}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            {site.resume && (
              <a href={site.resume}>
                Résumé <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <p className="availability">
          Interested in ambitious teams working on AI-native products and
          complex systems.
        </p>
        {json && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(json).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </div>
    </section>
  );
}
