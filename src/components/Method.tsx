"use client";
import { useState, useRef } from "react";
const steps = [
  [
    "Understand",
    "What is really happening?",
    "Start close to users, operations, and the places where existing software breaks.",
  ],
  [
    "Model",
    "How does the whole system work?",
    "Map the workflow, its roles, its constraints, and the relationships between its parts.",
  ],
  [
    "Simplify",
    "What is the smallest useful change?",
    "Choose the simplest intervention that addresses the actual problem. It may be code, automation, or a better workflow.",
  ],
  [
    "Build",
    "What happens if we make it real?",
    "Prototype and implement. AI-assisted development is a multiplier for product and system reasoning.",
  ],
  [
    "Ship",
    "Can someone actually use this?",
    "Put the system into use. Deployment and operations are part of building the product.",
  ],
  [
    "Observe",
    "What does reality say?",
    "Pay attention to how the system works in practice and where its assumptions stop holding.",
  ],
  [
    "Iterate",
    "What should change next?",
    "Use that feedback to improve the system. Return to understanding whenever the problem changes.",
  ],
];
export default function Method() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function move(i: number) {
    setActive(i);
    refs.current[i]?.focus();
  }
  return (
    <div className="method-loop">
      <div className="method-tabs" role="tablist" aria-label="Working process">
        {steps.map(([name], i) => (
          <button
            key={name}
            role="tab"
            id={`method-tab-${i}`}
            aria-controls={`method-panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (active + 1) % 7
                  : e.key === "ArrowLeft"
                    ? (active + 6) % 7
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 6
                        : null;
              if (next !== null) {
                e.preventDefault();
                move(next);
              }
            }}
            className={active === i ? "active" : ""}
          >
            <span className="mono">0{i + 1}</span>
            {name}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      {steps.map(([, question, description], i) => (
        <div key={i} role="tabpanel" id={`method-panel-${i}`}
          aria-labelledby={`method-tab-${i}`} hidden={active !== i}
          tabIndex={0} className="method-panel">
          <span className="mono">THE QUESTION</span>
          <h3>{question}</h3><p>{description}</p>
        </div>
      ))}
      <span className="loop-return mono">
        ↶ FEEDBACK RETURNS TO THE BEGINNING
      </span>
      <noscript>
        <ul>{steps.map(([name, question, body]) => (
          <li key={name}><h3>{name}: {question}</h3><p>{body}</p></li>
        ))}</ul>
      </noscript>
    </div>
  );
}
