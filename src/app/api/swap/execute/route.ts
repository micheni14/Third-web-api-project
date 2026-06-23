import { NextRequest } from "next/server";
import { base } from "thirdweb/chains";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.THIRDWEB_SECRET_KEY) {
      return Response.json({ error: "Secret key not configured" }, { status: 500 });
    }

    const { quote, fromAddress } = await req.json();

    if (!quote?.txData) {
      return Response.json({ error: "No quote data" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.thirdweb.com/v5/swap/execute?chainId=${base.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.THIRDWEB_SECRET_KEY!,
        },
        body: JSON.stringify({
          quote: quote.txData,
          fromAddress,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Swap execute error:", err);
    return Response.json({ error: "Swap execution failed" }, { status: 500 });
  }
}
