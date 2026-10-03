export default function Hero() {
  return (
    <section className="hero shell" id="intro" aria-labelledby="intro-title">
      <div className="hero-top mono">
        <span>AN OPEN WORKBENCH</span>
        <span>PRODUCT × ENGINEERING × REALITY</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="identity">Product Builder & AI Product Engineer</p>
          <h1 id="intro-title">
            Follow the
            <br />
            problem <em>deeper.</em>
          </h1>
          <p className="hero-summary">
            I turn ambiguous problems into products,
            <br className="desktop-break" /> systems, and working software.
          </p>
          <a className="text-link" href="#system">
            Explore the system <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero-instrument">
          <div className="instrument-label mono">
            <span>FIG. 001 / WORKING RANGE</span>
            <span>↗</span>
          </div>
          <svg
            viewBox="0 0 430 350"
            role="img"
            aria-label="Conceptual diagram: a problem becomes a workflow, a product and a system, with feedback returning to the problem."
          >
            <defs>
              <marker
                id="arrow"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0 0L6 3L0 6" fill="none" stroke="currentColor" />
              </marker>
            </defs>
            <g stroke="#d9dcd5" strokeWidth="1">
              <path d="M35 20V320M125 20V320M215 20V320M305 20V320M395 20V320M20 50H410M20 130H410M20 210H410M20 290H410" />
            </g>
            <path
              d="M75 64C115 64 107 145 155 145S210 226 257 226S319 282 354 282"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M351 269C385 144 321 49 102 60"
              fill="none"
              stroke="#8d9791"
              strokeDasharray="4 5"
              markerEnd="url(#arrow)"
            />
            <g fill="var(--paper)" stroke="var(--accent)" strokeWidth="2">
              <circle cx="75" cy="64" r="7" />
              <circle cx="155" cy="145" r="7" />
              <circle cx="257" cy="226" r="7" />
              <circle cx="354" cy="282" r="7" />
            </g>
            <g fill="var(--ink)" fontFamily="monospace" fontSize="12">
              <text x="39" y="91">
                PROBLEM
              </text>
              <text x="126" y="174">
                WORKFLOW
              </text>
              <text x="229" y="255">
                PRODUCT
              </text>
              <text x="326" y="311">
                SYSTEM
              </text>
              <text x="247" y="60" fill="var(--muted)">
                FEEDBACK ↶
              </text>
              <text x="25" y="335" fill="var(--muted)">
                CONCEPTUAL MODEL / FEEDBACK LOOP
              </text>
            </g>
          </svg>
          <div className="instrument-foot">
            <span className="instrument-cross" aria-hidden="true">
              +
            </span>
            <p>
              The interesting work
              <br />
              usually lives between the boxes.
            </p>
            <span className="mono">01—08</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>BUILT AROUND PROBLEMS, NOT JOB TITLES.</span>
        <a href="#work">SELECTED WORK BELOW ↓</a>
      </div>
    </section>
  );
}
