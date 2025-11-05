// src/components/dixor/ProjectSectionBlock.tsx
type Props = { title?: string | null; html?: string | null; number?: string };

export default function ProjectSectionBlock({ title, html, number }: Props) {
  if (!html) return null;
  return (
    <div className="single-grid">
      <div className="item-grid-colum">
        <div className="left-info">
          {title ? <h3><strong>{number || ""}</strong> {title}</h3> : null}
        </div>
        <div className="right-info">
          <div
            className="prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
