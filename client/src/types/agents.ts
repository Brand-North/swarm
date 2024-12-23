import { PublicKey } from "@solana/web3.js";

export interface BaseAgent {
  name: string;
  role: string;
  description: string;
  systemPrompt: string;
  image: string;
}

export interface TokenDeployerAgent extends BaseAgent {
  capabilities: {
    deployToken: (decimals: number, name: string, symbol: string, initialSupply: number) => Promise<string>;
  };
}

export interface CollectionDeployerAgent extends BaseAgent {
  capabilities: {
    deployCollection: (name: string, symbol: string, uri: string, sellerFeeBasisPoints: number) => Promise<string>;
  };
}

export interface NFTMinterAgent extends BaseAgent {
  capabilities: {
    mintNFT: (collectionMint: string, metadata: any, recipient?: string) => Promise<string>;
  };
}

export interface TraderAgent extends BaseAgent {
  capabilities: {
    trade: (outputMint: string, inputAmount: number, inputMint?: string, slippageBps?: number) => Promise<string>;
    getBalance: (tokenAddress: string) => Promise<number>;
    pythFetchPrice: (priceFeedID: string) => Promise<number>;
  };
}

export interface LenderAgent extends BaseAgent {
  capabilities: {
    lendAsset: (assetMint: string, amount: number) => Promise<string>;
    stakeWithJup: (amount: number) => Promise<string>;
  };
}

export type AgentType = 
  | "token-deployer"
  | "collection-deployer"
  | "nft-minter"
  | "trader"
  | "lender";

export type SwarmAgent = 
  | TokenDeployerAgent 
  | CollectionDeployerAgent 
  | NFTMinterAgent 
  | TraderAgent 
  | LenderAgent;
