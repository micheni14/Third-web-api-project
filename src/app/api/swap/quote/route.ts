import { NextRequest } from "next/server";
import { base } from "thirdweb/chains";

export async function POST(req: NextRequest) {
  try {
    const { fromToken, toToken, amount, fromAddress } = await req.json();

    if (!process.env.THIRDWEB_SECRET_KEY) {
      return Response.json({ error: "Secret key not configured" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.thirdweb.com/v5/swap/quote?chainId=${base.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.THIRDWEB_SECRET_KEY,
        },
        body: JSON.stringify({
          fromTokenAddress: fromToken,
          toTokenAddress: toToken,
          amount,
          fromAddress,
          slippageBps: 50,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return Response.json({
      estimatedTo: data.estimatedTo || "—",
      rate: data.rate || "—",
      estimatedGas: data.estimatedGas || "—",
      txData: data.transactionRequest || data,
    });
  } catch (err) {
    console.error("Swap quote error:", err);
    return Response.json({ error: "Failed to get quote" }, { status: 500 });
  }
}
