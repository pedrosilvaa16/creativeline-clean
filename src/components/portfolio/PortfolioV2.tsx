// src/components/portfolio/PortfolioV2.tsx
import SinglePortfolioV2 from "./SinglePortfolioV2";
import SplitAnimation from "../animation/SplitAnimation";
import Link from "next/link";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ARCHIVE } from "@/graphql/portfolio";

type Props = {
  hasTitle?: boolean;
  moreBtn?: boolean;
  sectionClass?: string;
  first?: number;           // default 8
  after?: string | null;    // cursor vindo de /portfolio?after=...
};

export default async function PortfolioV2({
  hasTitle,
  moreBtn,
  sectionClass,
  first = 8,
  after = null,
}: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PORTFOLIO_ARCHIVE,
    variables: { first, after },
    fetchPolicy: "no-cache",
  });

  const conn = data?.portfolios;
  const nodes = conn?.nodes ?? [];
  const pageInfo = conn?.pageInfo;

  const items = nodes.map((n: any) => {
    const fi = n.featuredImage?.node;
    const firstTerm = n.portfolioCategories?.nodes?.[0] || null;

    return {
      id: n.id,
      thumb: fi?.mediaItemUrl || "",            // <- featuredImage como thumb
      tag: firstTerm?.name || "Uncategorized",  // <- taxonomia
      date: "",                                  // <- NÃO usar
      text: (n.excerpt || "").replace(/<[^>]*>?/gm, ""),
      href: n.uri || `/portfolio/${n.slug}`,
      clientName: n.portfolioFields?.clientName || n.title,   // 👈 AQUI
      _image: {
        url: fi?.mediaItemUrl,
        alt: fi?.altText || n.title,
        width: fi?.mediaDetails?.width,
        height: fi?.mediaDetails?.height,
      },
    };
  });

  return (
    <div className={`portfolio-style-two-area overflow-hidden ${sectionClass || ""}`}>
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
              {items.map((portfolio: any) => (
                <div className="col-lg-6 item-center" key={portfolio.id}>
                  <SinglePortfolioV2 portfolio={portfolio} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {moreBtn && pageInfo?.hasNextPage && (
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
