import Link from "next/link";

type BreadcrumbProps = {
  /** Título principal da página */
  title?: string;
  /** Último nível textual (ex: slug ou nome do cliente) */
  breadCrumb?: string;
  /** Nome do cliente vindo do ACF (sobrescreve breadCrumb) */
  clientName?: string;
};

const Breadcrumb = ({ title, breadCrumb, clientName }: BreadcrumbProps) => {
  const current = clientName || breadCrumb || "error";

  return (
    <div
      className="breadcrumb-area text-center bg-cover"
      style={{ backgroundImage: `url(/assets/img/shape/10.jpg)` }}
    >
      {/* Overlay decorativo */}
      <div
        className="light-banner-active bg-gray bg-cover"
        style={{ backgroundImage: `url(/assets/img/shape/6.jpg)` }}
      />

      <div className="container">
        <div className="breadcrumb-item">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{title ?? "not found"}</h1>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="fas fa-home" /> Home
                    </Link>
                  </li>

                  {/* Novo nível: Portfolio */}
                  <li className="breadcrumb-item">
                    <Link href="/portfolio">Portfolio</Link>
                  </li>

                  {/* Último nível (dinâmico: nome do cliente ou breadCrumb) */}
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    {current}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
