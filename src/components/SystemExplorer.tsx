"use client";
import { useState } from "react";
const layers = [
  [
    "User",
    "Start where the friction is.",
    "Listen to the people using the product. Understand what actually happens, including the work outside the interface.",
  ],
  [
    "Workflow",
    "Model the work, not just the screen.",
    "Follow the handoffs, decisions, exceptions, and feedback loops. Sometimes the right solution is a simpler workflow.",
  ],
  [
    "Product",
    "Make the problem tangible.",
    "Turn a useful understanding of the workflow into a product people can try, use, and respond to.",
  ],
  [
    "Interface",
    "Give the system a usable shape.",
    "Think through how people interact with the product and how the experience fits their real work.",
  ],
  [
    "API",
    "Connect the moving parts.",
    "Move beyond the interface when solving the problem requires backend pieces, APIs, or integrations.",
  ],
  [
    "Data",
    "Make context usable.",
    "Work with databases, storage, and operational records so information has a coherent place in the system.",
  ],
  [
    "Infrastructure",
    "Build something that can run.",
    "Explore hosting, AWS, infrastructure, and the practical requirements of deploying working software.",
  ],
  [
    "AI",
    "Rethink what the product can become.",
    "Explore systems that can understand intent, remember context, use tools, and act. This is an ongoing research direction.",
  ],
];
export default function SystemExplorer() {
  const [active, setActive] = useState(1);
  return (
    <div className="system-explorer">
      <div className="system-layers" aria-label="Explore capability layers">
        {layers.map(([name], i) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={active === i ? "layer active" : "layer"}
          >
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <strong>{name}</strong>
            <span className="layer-mark" aria-hidden="true">
              {active === i ? "↗" : "+"}
            </span>
          </button>
        ))}
      </div>
      <div className="system-detail" aria-live="polite">
        <span className="mono blue">
          LAYER / {String(active + 1).padStart(2, "0")}
        </span>
        <div className="detail-target" aria-hidden="true">
          <span>+</span>
          <div />
          <span>+</span>
        </div>
        <h3>{layers[active][1]}</h3>
        <p>{layers[active][2]}</p>
        <div className="system-note mono">
          CLICK A LAYER TO FOLLOW THE PROBLEM
        </div>
      </div>
      <noscript>
        <ul>
          {layers.map(([name, title, body]) => (
            <li key={name}>
              <strong>
                {name}: {title}
              </strong>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
