"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { client } from "./Providers";
import {  Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ai", label: "AI" },
  { href: "/swap", label: "Swap" },
];

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          
          <span className="text-base font-semibold">Third web</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-[var(--accent)] bg-[var(--accent)]/10"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[var(--card)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ConnectButton
              client={client}
              chain={base}
              connectButton={{
                label: "Connect",
                className: "btn-primary !px-3 !py-2 !text-sm",
              }}
              connectModal={{ size: "wide" }}
              theme="dark"
            />
          </div>
          <button
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-[var(--accent)] bg-[var(--accent)]/10"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[var(--border)]">
              <ConnectButton
                client={client}
                chain={base}
                connectButton={{
                  label: "Connect Wallet",
                  className: "btn-primary w-full !justify-center",
                }}
                connectModal={{ size: "wide" }}
                theme="dark"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
