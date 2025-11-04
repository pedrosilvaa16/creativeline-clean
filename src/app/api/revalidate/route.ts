import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  // Revalida páginas genéricas
  revalidatePath("/portfolio");

  // Se quiseres tags (quando usares fetch com { next: { tags: [...] } })
  revalidateTag("portfolio");

  return NextResponse.json({ revalidated: true });
}
