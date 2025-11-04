import { NextResponse } from "next/server";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ITEM } from "@/graphql/portfolio";

type GalleryEdge = {
  node?: {
    mediaItemUrl?: string;
    mediaDetails?: { width?: number; height?: number };
  };
};

type PortfolioFields = {
  summary?: string;
  sectionBackground?: string;
  sectionChallenges?: string;
  sectionSolution?: string;
  heroImage?: { node?: { mediaItemUrl?: string } };
  gallery?: { edges?: GalleryEdge[] };
};

type PortfolioItemResponse = {
  portfolio?: {
    id: string;
    slug: string;
    title: string;
    date?: string;
    portfolioFields?: PortfolioFields;
  };
};

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params?.slug;
    if (!slug) return NextResponse.json({ ok: false, error: "missing slug" }, { status: 400 });

    const client = getClient();
    const { data } = await client.query<PortfolioItemResponse>({
      query: GET_PORTFOLIO_ITEM,
      variables: { slug },
    });

    if (!data?.portfolio) {
      return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, portfolio: data.portfolio });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
