import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_LIST } from "@/graphql/portfolio";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ISR

export default async function PortfolioPage() {
  const client = getClient();
  const { data } = await client.query({ query: GET_PORTFOLIO_LIST });

  const items = data?.portfolios?.nodes ?? [];

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium mb-8">Portfolio</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p: any) => (
          <li key={p.id} className="group">
            <Link href={`/portfolio/${p.slug}`}>
              <div className="aspect-video relative bg-neutral-100">
                {p?.portfolioFields?.heroImage?.node?.mediaItemUrl && (
                  <Image
                    src={p.portfolioFields.heroImage.node.mediaItemUrl}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="mt-3 text-lg">{p.title}</h3>
              {p?.portfolioFields?.summary && (
                <p className="text-sm text-neutral-500">{p.portfolioFields.summary}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
