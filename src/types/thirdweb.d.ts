declare module "thirdweb/react" {
  import { ThirdwebClient } from "thirdweb";
  import { Chain } from "thirdweb/chains";

  export function useActiveAccount(): { address: string; chainId?: number } | undefined;
  export function useActiveWallet(): any;
  export function useConnectedWallet(): any;
  export function useWalletBalance(params: { client: ThirdwebClient; chain: Chain; address?: string }): any;

  export function ConnectButton(props: {
    client: ThirdwebClient;
    chain?: Chain;
    connectButton?: { label?: string; className?: string };
    connectModal?: { size?: "compact" | "wide" };
    theme?: "light" | "dark";
  }): JSX.Element;

  export function ConnectEmbed(props: {
    client: ThirdwebClient;
    chain?: Chain;
    modalSize?: "compact" | "wide";
  }): JSX.Element;

  export function ThirdwebProvider({ children }: { children: React.ReactNode }): JSX.Element;
}

declare module "thirdweb/chains" {
  export interface Chain {
    id: number;
    name: string;
    rpc?: string;
    nativeCurrency?: { name: string; symbol: string; decimals: number };
    testnet?: boolean;
  }

  export const base: Chain;
  export const ethereum: Chain;
  export const polygon: Chain;
  export const arbitrum: Chain;
  export const optimism: Chain;
  export const defineChain: (chain: number | Chain) => Chain;
}

declare module "thirdweb" {
  export function createThirdwebClient(config: { clientId?: string; secretKey?: string }): ThirdwebClient;

  export interface ThirdwebClient {
    clientId: string;
    secretKey?: string;
  }
}
