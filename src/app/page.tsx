import { Sparkles, ArrowLeftRight, Coins } from "lucide-react";
import Link from "next/link";

const features = [
  {
    href: "/ai",
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Chat with your personal DeFi agent. Ask about your portfolio, get market insights, and execute transactions naturally.",
    gradient: "from-[var(--accent)] to-purple-500",
  },
  {
    href: "/swap",
    icon: ArrowLeftRight,
    title: "Token Swap",
    description:
      "Swap tokens across Base network at the best rates. Real-time quotes with minimal slippage.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/ai",
    icon: Coins,
    title: "Portfolio AI",
    description:
      "Monitor your balances, track transaction history, and receive personalized DeFi recommendations.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-12 pt-12 sm:gap-16 sm:pt-20">
      <div className="flex flex-col items-center gap-6 text-center px-2">
        
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Your AI DeFi
            <br />
            <span className="text-gradient">Agent on Base</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-400 max-w-lg mx-auto px-2">
            Chat with AI to manage your portfolio, swap tokens, and execute
            blockchain transactions — all in natural language.
          </p>
        </div>
      </div>

      <div className="grid w-full gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-3 px-2 sm:px-0">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group card p-5 sm:p-6"
          >
            <div
              className={`mb-3 sm:mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
            >
              <feature.icon className="h-[18px] w-[18px] sm:h-5 sm:w-5 text-white" />
            </div>
            <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-[15px] font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 sm:px-6 py-3 sm:py-4 text-xs text-zinc-500">
        <span>Thirdweb AI</span>
        <span className="h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
        <span>Base Network</span>
        <span className="h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
        <span>Smart Wallet</span>
      </div>
    </div>
  );
}
