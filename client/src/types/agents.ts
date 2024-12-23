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

// Preset Configuration Types
export interface SwarmPreset {
  id: string;
  name: string;
  description: string;
  agentTypes: AgentType[];
  neuralCapacity: number;
  cognitiveVariance: number;
  category: PresetCategory;
  icon: string;
}

export const PresetCategory = {
  DEFI: "DEFI",
  NFT: "NFT",
  TRADING: "TRADING",
  YIELD: "YIELD",
  MEME: "MEME"
} as const;

export type PresetCategory = typeof PresetCategory[keyof typeof PresetCategory];

// Token Deployer Agent Params
export interface TokenDeployerParams {
  name: string;
  uri: string;
  symbol: string;
  decimals?: number;
  initialSupply?: number;
}

// Collection Deployer Agent Params
export interface CollectionDeployerParams {
  name: string;
  uri: string;
  royaltyBasisPoints: number;
  creators: {
    address: string;
    percentage: number;
  }[];
}

// NFT Minter Agent Params
export interface NFTMinterParams {
  collectionMint: string;
  metadata: {
    name: string;
    uri: string;
  };
  recipient?: string;
}

// Trader Agent Params
export interface TraderParams {
  outputMint: string;
  inputAmount: number;
  inputMint?: string;
  slippageBps?: number;
}

// Lender Agent Params
export interface LenderParams {
  assetMint: string;
  amount: number;
}