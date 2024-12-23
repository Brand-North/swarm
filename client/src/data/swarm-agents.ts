import { SwarmAgent, AgentType } from "@/types/agents";

export const swarmAgents: Record<AgentType, SwarmAgent> = {
  "token-deployer": {
    name: "TokenMaster",
    role: "Token Deployment Specialist",
    description: "Specializes in deploying and managing SPL tokens on the Solana blockchain with precision and efficiency.",
    systemPrompt: "You are TokenMaster, an expert in Solana token deployment. Your mission is to create and deploy SPL tokens with optimal parameters for maximum utility.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=300&h=300",
    capabilities: {
      deployToken: async (decimals, name, symbol, initialSupply) => {
        throw new Error("Not implemented");
      },
    },
  },
  "collection-deployer": {
    name: "CollectionForge",
    role: "NFT Collection Architect",
    description: "Creates and deploys NFT collections with customizable metadata and royalty structures.",
    systemPrompt: "You are CollectionForge, a master of NFT collection deployment. Your purpose is to establish robust NFT collections with proper metadata and royalty configurations.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=300",
    capabilities: {
      deployCollection: async (name, symbol, uri, sellerFeeBasisPoints) => {
        throw new Error("Not implemented");
      },
    },
  },
  "nft-minter": {
    name: "MintMaster",
    role: "NFT Minting Specialist",
    description: "Handles the minting process for NFTs within collections, ensuring proper metadata and attributes.",
    systemPrompt: "You are MintMaster, an expert in NFT minting operations. Your goal is to mint NFTs with precision and proper collection attribution.",
    image: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?auto=format&fit=crop&w=300&h=300",
    capabilities: {
      mintNFT: async (collectionMint, metadata, recipient) => {
        throw new Error("Not implemented");
      },
    },
  },
  "trader": {
    name: "TradeOracle",
    role: "DeFi Trading Specialist",
    description: "Executes token swaps and monitors market prices using Jupiter Exchange and Pyth oracles.",
    systemPrompt: "You are TradeOracle, a DeFi trading expert. Your mission is to facilitate token swaps and provide price information for optimal trading decisions.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&h=300",
    capabilities: {
      trade: async (outputMint, inputAmount, inputMint, slippageBps) => {
        throw new Error("Not implemented");
      },
      getBalance: async (tokenAddress) => {
        throw new Error("Not implemented");
      },
      pythFetchPrice: async (priceFeedID) => {
        throw new Error("Not implemented");
      },
    },
  },
  "lender": {
    name: "YieldSage",
    role: "Lending & Staking Specialist",
    description: "Manages lending operations and staking positions to generate yield from idle assets.",
    systemPrompt: "You are YieldSage, an expert in DeFi lending and staking. Your purpose is to optimize yield generation through various lending protocols and staking opportunities.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=300&h=300",
    capabilities: {
      lendAsset: async (assetMint, amount) => {
        throw new Error("Not implemented");
      },
      stakeWithJup: async (amount) => {
        throw new Error("Not implemented");
      },
    },
  },
};
