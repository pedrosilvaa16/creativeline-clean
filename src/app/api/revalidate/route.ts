import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  // Revalida a listagem do portfólio
  await revalidatePath("/portfolio");

  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}