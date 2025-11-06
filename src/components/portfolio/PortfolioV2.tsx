// src/components/portfolio/PortfolioV2.tsx
import SinglePortfolioV2 from "./SinglePortfolioV2";
import SplitAnimation from "../animation/SplitAnimation";
import Link from "next/link";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ARCHIVE } from "@/graphql/portfolio";

/* =========================
   Tipos mínimos do payload
   ========================= */

type GqlImageNode = {
  mediaItemUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
} | null;

type GqlCategoryNode = { name?: string | null } | null;

type PortfolioNode = {
  id: string;
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  excerpt?: string | null;
  featuredImage?: { node?: GqlImageNode } | null;
  portfolioCategories?: { nodes?: GqlCategoryNode[] | null } | null;
  portfolioFields?: { clientName?: string | null } | null;
};

type PageInfo = {
  hasNextPage?: boolean | null;
  endCursor?: string | null;
} | null;

type PortfoliosResponse = {
  portfolios?: {
    nodes?: PortfolioNode[] | null;
    pageInfo?: PageInfo;
  } | null;
};

/* ================
   Props do layout
   ================ */
type Props = {
  hasTitle?: boolean;
  moreBtn?: boolean;
  sectionClass?: string;
  first?: number;        // default 8
  after?: string | null; // cursor vindo de /portfolio?after=...
};

/* ===============
   Utils locais
   =============== */
const stripHtml = (html?: string | null) =>
  (html ?? "").replace(/<[^>]*>?/gm, "").trim();

/* ==========================
   Componente (Server) async
   ========================== */
export default async function PortfolioV2({
  hasTitle,
  moreBtn,
  sectionClass = "",
  first = 8,
  after = null,
}: Props) {
  const client = getClient();

  const { data } = await client.query<PortfoliosResponse>({
    query: GET_PORTFOLIO_ARCHIVE,
    variables: { first, after },
    fetchPolicy: "no-cache",
  });

  const conn = data?.portfolios ?? null;
  const nodes = conn?.nodes ?? [];
  const pageInfo = conn?.pageInfo ?? null;

  const items = nodes.map((n): {
    id: string;
    thumb: string;
    tag: string;
    date: string;
    text: string;
    href: string;
    clientName: string;
    _image: {
      url?: string | null;
      alt?: string | null;
      width?: number | null;
      height?: number | null;
    };
  } => {
    const fi = n?.featuredImage?.node ?? null;
    const firstTerm = n?.portfolioCategories?.nodes?.[0] ?? null;

    const id = n?.id ?? crypto.randomUUID();
    const title = n?.title ?? "Untitled";
    const slug = n?.slug ?? "";
    const href = n?.uri || (slug ? `/portfolio/${slug}` : "/portfolio");

    return {
      id,
      thumb: fi?.mediaItemUrl || "",
      tag: firstTerm?.name || "Uncategorized",
      date: "", // não usado no tema
      text: stripHtml(n?.excerpt),
      href,
      clientName: n?.portfolioFields?.clientName || title,
      _image: {
        url: fi?.mediaItemUrl ?? null,
        alt: fi?.altText || title,
        width: fi?.mediaDetails?.width ?? null,
        height: fi?.mediaDetails?.height ?? null,
      },
    };
  });

  return (
    <div className={`portfolio-style-two-area overflow-hidden ${sectionClass}`}>
      {hasTitle && (
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Popular Projects</h4>
                <SplitAnimation>
                  <h2 className="title split-text">Featured Works</h2>
                </SplitAnimation>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mt--100 mt-xs--50">
        <div className="row">
          <div className="col-lg-12">
            <div className="row gutter-xl">
              {items.map((portfolio) => (
                <div className="col-lg-6 item-center" key={portfolio.id}>
                  <SinglePortfolioV2 portfolio={portfolio} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {moreBtn && pageInfo?.hasNextPage && pageInfo?.endCursor && (
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Link
                  className="btn-round-animation dark mt-80"
                  href={`/portfolio?after=${encodeURIComponent(pageInfo.endCursor)}`}
                >
                  Load More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}