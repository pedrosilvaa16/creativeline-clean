import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_LIST } from "@/graphql/portfolio";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

// 🔹 Tipo para a resposta GraphQL
type PortfolioListResponse = {
  portfolios?: {
    nodes?: {
      id: string;
      slug: string;
      title: string;
      portfolioFields?: {
        summary?: string;
        heroImage?: {
          node?: { mediaItemUrl?: string };
        };
      };
    }[];
  };
};

export default async function Page() {
  const client = getClient();

  const { data } = await client.query<PortfolioListResponse>({
    query: GET_PORTFOLIO_LIST,
  });

  const items = data?.portfolios?.nodes ?? [];

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-10">Portfolio</h1>

      {items.length === 0 ? (
        <p className="text-neutral-500">No projects found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.slug}`}
              className="group block rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition"
            >
              {p?.portfolioFields?.heroImage?.node?.mediaItemUrl && (
                <div className="aspect-video relative bg-neutral-100">
                  <Image
                    src={p.portfolioFields.heroImage.node.mediaItemUrl}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition">
                  {p.title}
                </h2>
                {p?.portfolioFields?.summary && (
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    {p.portfolioFields.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}