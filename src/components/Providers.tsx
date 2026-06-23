"use client";

import { createThirdwebClient, type ThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

let _client: ThirdwebClient | undefined;

export function getClient(): ThirdwebClient {
  if (!_client) {
    const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
    _client = clientId
      ? createThirdwebClient({ clientId })
      : ({ clientId: "" } as ThirdwebClient);
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
