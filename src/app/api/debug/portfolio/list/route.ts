import { NextResponse } from "next/server";
import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_LIST } from "@/graphql/portfolio";

type PortfolioListResponse = {
  portfolios?: { nodes?: { id: string; slug: string; title: string }[] };
};

export async function GET() {
  try {
    const client = getClient();
    const { data } = await client.query<PortfolioListResponse>({
      query: GET_PORTFOLIO_LIST,
    });
    const nodes = data?.portfolios?.nodes ?? [];
    return NextResponse.json({ ok: true, count: nodes.length, nodes });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
