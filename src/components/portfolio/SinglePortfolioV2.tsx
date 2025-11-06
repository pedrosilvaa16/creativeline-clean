"use client";

import Image from "next/image";
import Link from "next/link";
import useLeftRightAnimation from "@/hooks/useLeftRightAnimation";

type ImageMeta = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
};

export interface PortfolioCard {
  id: string;
  thumb: string;
  tag?: string;
  text?: string;        // resumo (não será mostrado)
  href: string;
  clientName?: string;  // título principal
  _image?: ImageMeta;
}

const isAbsolute = (u?: string) => !!u && /^https?:\/\//i.test(u);
const resolveThumbSrc = (thumb?: string) =>
  !thumb
    ? "/assets/img/placeholder/placeholder-1200x800.jpg"
    : isAbsolute(thumb)
    ? thumb
    : `/assets/img/portfolio/${thumb}`;

const SinglePortfolioV2 = ({ portfolio }: { portfolio: PortfolioCard }) => {
  const { thumb, tag, href, clientName, _image } = portfolio;
  const containerRef = useLeftRightAnimation();

  const src = resolveThumbSrc(thumb);
  const alt = _image?.alt || clientName || "Project image";
  const width = _image?.width || 826;
  const height = _image?.height || 1067;

  return (
    <div className="portfolio-style-two">
      <Link href={href} className="cursor-target">
        <div className="thumb-zoom" ref={containerRef}>
          <Image
            className="img-reveal"
            src={src}
            width={Number(width)}
            height={Number(height)}
            alt={alt}
          />
        </div>

        <div className="pf-item-info">
          <div className="content">
            {/* linha das tags (ex. Marketing) */}
            <div className="pf-tags">
              {tag ? <span className="btn-tag">{tag}</span> : null}
            </div>

            {/* título principal → clientName */}
            {clientName && <h2>{clientName}</h2>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SinglePortfolioV2;
