export type SwapQuote = {
  estimatedTo: string;
  rate: string;
  estimatedGas: string;
  txData: any;
};

export async function getSwapQuote(params: {
  fromToken: string;
  toToken: string;
  amount: string;
  fromAddress: string;
}): Promise<SwapQuote> {
  const res = await fetch("/api/swap/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to get quote");
  }

  return res.json();
}
