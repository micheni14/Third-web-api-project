import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Franje — AI DeFi Agent on Base",
  description:
    "Chat with AI to manage your portfolio, swap tokens, and execute blockchain transactions on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <NavBar />
          <main className="mx-auto max-w-5xl px-3 sm:px-4 py-6 sm:py-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
