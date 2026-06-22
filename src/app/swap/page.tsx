"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getSwapQuote, SwapQuote } from "@/lib/swap";
import { AlertCircle, Loader2, ArrowUpDown } from "lucide-react";

const TOKENS = [
  { symbol: "ETH", address: "native", decimals: 18 },
  { symbol: "USDC", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", decimals: 6 },
  { symbol: "DAI", address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", decimals: 18 },
  { symbol: "cbETH", address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22", decimals: 18 },
];

export default function SwapPage() {
  const account = useActiveAccount();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const fetchQuote = async () => {
    if (!amount || !account) return;
    setIsLoading(true);
    try {
      const result = await getSwapQuote({
        fromToken: fromToken.address,
        toToken: toToken.address,
        amount,
        fromAddress: account.address,
      });
      setQuote(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!quote || !account) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/swap/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, fromAddress: account.address }),
      });
      const data = await res.json();
      setTxHash(data.hash || data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 sm:gap-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Swap</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Swap tokens on Base</p>
      </div>

      {!account && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-amber-400">
          <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          Connect your wallet to swap tokens
        </div>
      )}

      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] sm:text-xs font-medium text-zinc-500">You pay</label>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-2.5 sm:p-3">
            <select
              value={fromToken.symbol}
              onChange={(e) => {
                const t = TOKENS.find((t) => t.symbol === e.target.value);
                if (t) setFromToken(t);
              }}
              className="appearance-none bg-transparent pr-2 sm:pr-4 text-sm font-medium outline-none cursor-pointer"
            >
              {TOKENS.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="input-field !border-0 !bg-transparent text-right text-base sm:text-lg"
            />
          </div>
        </div>

        <div className="flex justify-center -my-2.5 sm:-my-2 relative z-10">
          <button
            onClick={() => {
              setFromToken(toToken);
              setToToken(fromToken);
              setQuote(null);
            }}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10"
          >
            <ArrowUpDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] sm:text-xs font-medium text-zinc-500">You receive</label>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-2.5 sm:p-3">
            <select
              value={toToken.symbol}
              onChange={(e) => {
                const t = TOKENS.find((t) => t.symbol === e.target.value);
                if (t) setToToken(t);
              }}
              className="appearance-none bg-transparent pr-2 sm:pr-4 text-sm font-medium outline-none cursor-pointer"
            >
              {TOKENS.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </select>
            <div className="flex-1 text-right text-base sm:text-lg text-zinc-500">
              {quote ? quote.estimatedTo : "—"}
            </div>
          </div>
        </div>

        {quote && !txHash && (
          <div className="mt-3 rounded-lg bg-zinc-800/30 p-3 space-y-1">
            <div className="flex justify-between text-[11px] sm:text-xs text-zinc-500">
              <span>Rate</span>
              <span>1 {fromToken.symbol} ≈ {quote.rate} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-[11px] sm:text-xs text-zinc-500">
              <span>Gas</span>
              <span>~{quote.estimatedGas} wei</span>
            </div>
          </div>
        )}

        {account && (
          <button
            onClick={quote && !txHash ? executeSwap : fetchQuote}
            disabled={isLoading || !amount}
            className="btn-primary mt-4 w-full text-sm sm:text-base"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : quote && !txHash ? (
              `Swap ${amount} ${fromToken.symbol}`
            ) : (
              "Get quote"
            )}
          </button>
        )}

        {txHash && (
          <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-center text-xs sm:text-sm text-emerald-400">
            Transaction submitted
            <br />
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block underline underline-offset-2 hover:text-emerald-300"
            >
              View on Basescan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
