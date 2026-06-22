# Franje — AI DeFi Agent on Base

Chat with an AI to manage your portfolio, swap tokens, and execute blockchain transactions on Base — all in natural language.

## Features

- **AI Assistant** — Ask about your portfolio, get market insights, and execute transactions via chat
- **Token Swap** — Swap ETH, USDC, DAI, and cbETH on Base with real-time quotes
- **Smart Wallet** — Connect with Thirdweb Smart Wallet for gasless, seamless transactions
- **Powered by Thirdweb AI** — Blockchain-aware LLM that understands chains, tokens, and on-chain operations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Blockchain | Base Network |
| Wallet | Thirdweb Smart Wallet |
| AI | Thirdweb AI (`t0-latest`) |
| Swap | Thirdweb Bridge API |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone <your-repo-url>
cd franje-app

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

Add your Thirdweb keys to `.env.local`:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id
THIRDWEB_SECRET_KEY=your_secret_key
```

### Run

```bash
npm run dev
# or with Turbopack for faster rebuilds:
npm run dev -- --turbo
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── ai/             # AI chat page
│   ├── swap/           # Token swap page
│   ├── api/
│   │   ├── chat/       # AI proxy (server-side)
│   │   └── swap/       # Swap quote + execute (server-side)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── error.tsx       # Error boundary
│   ├── loading.tsx     # Loading state
│   └── not-found.tsx   # 404 page
├── components/
│   ├── NavBar.tsx      # Navigation + wallet connect
│   └── Providers.tsx   # Thirdweb provider
├── lib/
│   └── swap.ts         # Swap API client (browser-safe)
└── types/              # Type declarations
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import on Vercel
3. Add `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` and `THIRDWEB_SECRET_KEY` as environment variables
4. Allowlist your production domain in the [Thirdweb dashboard](https://thirdweb.com/dashboard)

## License

MIT
