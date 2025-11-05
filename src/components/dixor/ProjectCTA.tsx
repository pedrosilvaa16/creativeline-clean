// src/components/dixor/ProjectCTA.tsx
export default function ProjectCTA({ url }: { url?: string | null }) {
  if (!url) return null;
  return (
    <div className="single-grid">
      <div className="item-grid-colum">
        <div className="left-info" />
        <div className="right-info">
          <a className="btn-round-animation dark" href={url} target="_blank" rel="noreferrer">
            Visitar projeto
          </a>
        </div>
      </div>
    </div>
  );
}
