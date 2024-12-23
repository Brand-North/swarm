import { PublicKey } from "@solana/web3.js";

export interface AgentConfig {
  name: string;
  description: string;
  type: AgentType;
  icon: string;
}

export const AgentType = {
  TOKEN_DEPLOYER: "TOKEN_DEPLOYER",
  COLLECTION_DEPLOYER: "COLLECTION_DEPLOYER",
  NFT_MINTER: "NFT_MINTER",
  TRADER: "TRADER",
  LENDER: "LENDER"
} as const;

export type AgentType = typeof AgentType[keyof typeof AgentType];

export interface BaseAgentProps {
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

export interface TokenDeployerParams {
  name: string;
  uri: string;
  symbol: string;
  decimals?: number;
  initialSupply?: number;
}

export interface CollectionDeployerParams {
  name: string;
  uri: string;
  royaltyBasisPoints: number;
  creators: {
    address: string;
    percentage: number;
  }[];
}

export interface NFTMinterParams {
  collectionMint: string;
  metadata: {
    name: string;
    uri: string;
  };
  recipient?: string;
}

export interface TraderParams {
  outputMint: string;
  inputAmount: number;
  inputMint?: string;
  slippageBps?: number;
}

export interface LenderParams {
  assetMint: string;
  amount: number;
}