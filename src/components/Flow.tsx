export default function Flow({ items }: { items: string[] }) {
  return (
    <ol className="flow" aria-label="Conceptual workflow">
      {items.map((s, i) => (
        <li key={s}>
          <span className="mono">{String(i + 1).padStart(2, "0")}</span>
          <strong>{s}</strong>
          {i < items.length - 1 && (
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
