export default function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
      <span className="label-line" aria-hidden="true" />
    </div>
  );
}
