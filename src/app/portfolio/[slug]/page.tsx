import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ITEM, GET_PORTFOLIO_LIST } from "@/graphql/portfolio";

export const revalidate = 60;

// 🔹 Tipo para lista (usado em generateStaticParams)
type PortfolioListResponse = {
  portfolios?: {
    nodes?: {
      slug: string;
    }[];
  };
};

// 🔹 Tipo para item individual (detalhe do portfólio)
type PortfolioItemResponse = {
  portfolio?: {
    id: string;
    slug: string;
    title: string;
    portfolioFields?: {
      summary?: string;
      heroImage?: {
        node?: { mediaItemUrl?: string };
      };
    };
  };
};

export async function generateStaticParams() {
  const client = getClient();

  const { data } = await client.query<PortfolioListResponse>({
    query: GET_PORTFOLIO_LIST,
  });

  const nodes = data?.portfolios?.nodes ?? [];

  // Apenas slugs válidos
  return nodes
    .filter((n) => !!n?.slug)
    .slice(0, 20)
    .map((n) => ({ slug: n.slug }));
}

export default async function Page({ params }: { params?: { slug?: string } }) {
  const client = getClient();

  // ⚙️ Proteção extra — evita erro "$slug of required type ID! was not provided"
  const slug = params?.slug;
  if (!slug) {
    console.error("❌ Missing slug param in portfolio/[slug]/page.tsx");
    return notFound();
  }

  const { data } = await client.query<PortfolioItemResponse>({
    query: GET_PORTFOLIO_ITEM,
    variables: { slug },
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
