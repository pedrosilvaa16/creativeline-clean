"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import * as React from "react";

interface BaseProps {
  navbarPlacement?: string;
  /** Optional handler from the theme that toggles submenus on mobile */
  toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface ProjectLink {
  /** Project title, shown in the megamenu list */
  title: string;
  /** Absolute or relative href to the project page (e.g. "/projects/my-slug") */
  href: string;
}

interface Props extends BaseProps {
  /** Up to ~9 recent projects to show in 3 columns (it works with fewer too). */
  recentProjects?: ProjectLink[];
  /** Banner image for the 4th column. Accepts a public path string or a static import. */
  bannerImage?: string | StaticImageData; // ⬅️ em vez de `any`
  /** Optional banner caption */
  bannerCaption?: string;
}

const DEFAULT_BANNER = "/assets/img/portfolio/14.jpg";

function toColumns<T>(items: T[], columns: number): T[][] {
  const out: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, idx) => {
    out[idx % columns].push(item);
  });
  return out;
}

export default function MainMenu({
  navbarPlacement = "",
  toggleSubMenu,
  recentProjects = [],
  bannerImage = DEFAULT_BANNER,
}: Props) {
  const cols = toColumns<ProjectLink>(recentProjects.slice(0, 9), 3); // max 3 x 3 items

  const handlePortfolioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // No mobile abrimos o dropdown; no desktop navegamos
    if (typeof window !== "undefined" && toggleSubMenu && window.innerWidth < 992) {
      e.preventDefault();
      toggleSubMenu(e);
    }
  };

  return (
    <ul
      className={`nav navbar-nav ${navbarPlacement}`}
      data-in="fadeInDown"
      data-out="fadeOutUp"
    >
      {/* Simple items (no dropdowns) */}
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about-us">About</Link>
      </li>
      <li>
        <Link href="/services">Services</Link>
      </li>

      {/* Projects — the ONLY dropdown (megamenu) */}
      <li className="dropdown megamenu-fw megamenu-style-two column-three">
        <Link
          href="/portfolio"
          className="dropdown-toggle"
          data-toggle="dropdown"
          onClick={handlePortfolioClick}
        >
          Portfolio
        </Link>

        <ul className="dropdown-menu megamenu-content" role="menu">
          <li>
            <div className="col-menu-wrap">
              <div className="menu-cal-items">
                {/* 3 link columns */}
                {cols.map((list, colIdx) => (
                  <div className="col-menu" key={`proj-col-${colIdx}`}>
                    {colIdx === 0 && <h4>Our Portfolio</h4>}
                    <ul className="menu-col">
                      {list.length === 0 ? (
                        <li className="disabled">
                          {/* evitar <a> sem href — acessível */}
                          <span aria-disabled="true">Coming soon</span>
                        </li>
                      ) : (
                        list.map((p, i) => (
                          <li key={`${p.href}-${i}`}>
                            <Link href={p.href}>{p.title}</Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 4th column: image banner */}
              <div className="megamenu-banner">
                <div className="thumb">
                  <Image
                    src={bannerImage || DEFAULT_BANNER}
                    alt="Projects highlight"
                    width={640}
                    height={360}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>

      <li>
        <Link href="/blog">blog</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
