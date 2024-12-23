import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { Connection, PublicKey } from "@solana/web3.js";
import { swarmAgents } from "@/data/swarm-agents";
import type { AgentType, SwarmAgent } from "@/types/agents";

interface DeployTokenResult {
  mint: PublicKey;
}

interface DeployCollectionResult {
  mint: PublicKey;
}

interface MintNFTResult {
  mint: PublicKey;
}

export class SwarmAgentService {
  private agent: SolanaAgentKit | null = null;
  private connection: Connection;

  constructor() {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required");
    }

    this.connection = new Connection(
      import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com",
      'confirmed'
    );
  }

  async initialize(wallet: PublicKey) {
    try {
      this.agent = new SolanaAgentKit(
        wallet.toBase58(),
        this.connection.rpcEndpoint,
        import.meta.env.VITE_OPENAI_API_KEY
      );

      // Initialize capabilities for each agent
      await this.initializeAgentCapabilities();
    } catch (error) {
      console.error("Failed to initialize SwarmAgentService:", error);
      throw error;
    }
  }

  private async initializeAgentCapabilities() {
    if (!this.agent) throw new Error("Agent not initialized");

    // Initialize TokenMaster capabilities
    const tokenAgent = swarmAgents["token-deployer"];
    if ("deployToken" in tokenAgent.capabilities) {
      tokenAgent.capabilities.deployToken = async (decimals, name, symbol, initialSupply) => {
        const { mint } = await this.agent!.deployToken(decimals);
        return mint.toBase58();
      };
    }

    // Initialize CollectionForge capabilities
    const collectionAgent = swarmAgents["collection-deployer"];
    if ("deployCollection" in collectionAgent.capabilities) {
      collectionAgent.capabilities.deployCollection = async (name, symbol, uri, sellerFeeBasisPoints) => {
        const { mint } = await this.agent!.deployCollection({
          name,
          uri,
          sellerFeeBasisPoints,
        });
        return mint.toBase58();
      };
    }

    // Initialize MintMaster capabilities
    const mintAgent = swarmAgents["nft-minter"];
    if ("mintNFT" in mintAgent.capabilities) {
      mintAgent.capabilities.mintNFT = async (collectionMint, metadata, recipient) => {
        const { mint } = await this.agent!.mintCollectionNFT(
          new PublicKey(collectionMint),
          metadata,
          recipient ? new PublicKey(recipient) : undefined
        );
        return mint.toBase58();
      };
    }

    // Initialize TradeOracle capabilities
    const tradeAgent = swarmAgents["trader"];
    if ("trade" in tradeAgent.capabilities) {
      tradeAgent.capabilities = {
        trade: async (outputMint, inputAmount, inputMint, slippageBps) => {
          const result = await this.agent!.trade(
            new PublicKey(outputMint),
            inputAmount,
            inputMint ? new PublicKey(inputMint) : undefined,
            slippageBps
          );
          return result.signature;
        },
        getBalance: async (tokenAddress) => {
          const balance = await this.agent!.getBalance(new PublicKey(tokenAddress));
          return Number(balance);
        },
        pythFetchPrice: async (priceFeedID) => {
          const price = await this.agent!.pythFetchPrice(priceFeedID);
          return Number(price);
        },
      };
    }

    // Initialize YieldSage capabilities
    const lendAgent = swarmAgents["lender"];
    if ("lendAsset" in lendAgent.capabilities) {
      lendAgent.capabilities = {
        lendAsset: async (assetMint, amount) => {
          const result = await this.agent!.lendAsset(new PublicKey(assetMint), amount);
          return result.signature;
        },
        stakeWithJup: async (amount) => {
          const result = await this.agent!.stakeWithJup(amount);
          return result.signature;
        },
      };
    }
  }

  getAvailableAgents(): SwarmAgent[] {
    return Object.values(swarmAgents);
  }

  getAgent(type: AgentType): SwarmAgent {
    return swarmAgents[type];
  }
}

// Create a singleton instance
export const swarmAgentService = new SwarmAgentService();