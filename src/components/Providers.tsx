"use client";

import { createThirdwebClient, type ThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

let _client: ThirdwebClient;

export function getClient(): ThirdwebClient {
  if (!_client) {
    _client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
    });
  }
  return _client;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
