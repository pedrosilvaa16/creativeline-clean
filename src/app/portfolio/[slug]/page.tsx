import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ITEM, GET_PORTFOLIO_LIST } from "@/graphql/portfolio";

export const revalidate = 60;

type PortfolioListResponse = {
  portfolios?: {
    nodes?: {
      slug: string;
    }[];
  };
};

eexport async function generateStaticParams() {
  const client = getClient();

  const { data } = await client.query<PortfolioListResponse>({
    query: GET_PORTFOLIO_LIST,
  });

  const nodes = data?.portfolios?.nodes ?? [];

  return nodes.slice(0, 20).map((n) => ({ slug: n.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PORTFOLIO_ITEM,
    variables: { slug: params.slug },
  });

  const p = data?.portfolio;
  if (!p) return notFound();

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium mb-6">{p.title}</h1>
      {p?.portfolioFields?.heroImage?.node?.mediaItemUrl && (
        <div className="aspect-video relative mb-8 bg-neutral-100">
          <Image
            src={p.portfolioFields.heroImage.node.mediaItemUrl}
            alt={p.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {p?.portfolioFields?.summary && (
        <p className="text-neutral-600 max-w-2xl">{p.portfolioFields.summary}</p>
      )}
    </main>
  );
}
