"use client";
// components/common/Breadcrumb.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  title?: string;
  items?: Crumb[];
  breadCrumb?: string;
  clientName?: string;
};

const Breadcrumb = ({ title, items, breadCrumb, clientName }: BreadcrumbProps) => {
  const pathname = usePathname();

  // Último nível textual
  const current = clientName || breadCrumb || title || "Not found";

  //
  // 🔥 PRIORIDADE 1 — se items vierem via props, respeitamos esses
  //
  if (items && items.length) {
    return renderBreadcrumb(title, items);
  }

  //
  // 🔥 PRIORIDADE 2 — lógica automática baseada na rota
  //

  // BLOG → /blog e /blog/slug
  if (pathname.startsWith("/blog")) {
    const blogItems: Crumb[] = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ];

    // se for artigo individual, adiciona o título
    if (pathname !== "/blog") {
      blogItems.push({ label: current });
    }

    return renderBreadcrumb(title, blogItems);
  }

  // PORTFOLIO → /portfolio e /portfolio/slug
  if (pathname.startsWith("/portfolio")) {
    const portfolioItems: Crumb[] = [
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
    ];

    if (pathname !== "/portfolio") {
      portfolioItems.push({ label: current });
    }

    return renderBreadcrumb(title, portfolioItems);
  }

  //
  // 🔥 PRIORIDADE 3 — fallback genérico (páginas normais)
  //
  const defaultItems: Crumb[] = [
    { label: "Home", href: "/" },
    { label: current },
  ];

  return renderBreadcrumb(title, defaultItems);
};

//
// 🔧 Função para evitar duplicar JSX — só trata da parte visual
//
function renderBreadcrumb(title: string | undefined, items: Crumb[]) {
  return (
    <div
      className="breadcrumb-area text-center bg-cover"
      style={{ backgroundImage: `url(/assets/img/shape/10.jpg)` }}
    >
      <div
        className="light-banner-active bg-gray bg-cover"
        style={{ backgroundImage: `url(/assets/img/shape/6.jpg)` }}
      />

      <div className="container">
        <div className="breadcrumb-item">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{title ?? "Not found"}</h1>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  {items.map((c, i) => {
                    const isLast = i === items.length - 1;
                    return (
                      <li
                        key={`${c.label}-${i}`}
                        className={`breadcrumb-item${isLast ? " active" : ""}`}
                        {...(isLast ? { "aria-current": "page" } : {})}
                      >
                        {c.href && !isLast ? (
                          <Link href={c.href}>{c.label}</Link>
                        ) : (
                          c.label
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
