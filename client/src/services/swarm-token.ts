import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { Connection, PublicKey } from "@solana/web3.js";

interface TokenDeploymentResult {
  success: boolean;
  tokenAddress?: string;
  error?: string;
}

interface SwarmCreationResult {
  success: boolean;
  collectionAddress?: string;
  error?: string;
}

export class SwarmTokenService {
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
    } catch (error) {
      console.error("Failed to initialize SolanaAgentKit:", error);
      throw error;
    }
  }

  async deployToken(supply: number = 1000000, decimals: number = 9): Promise<TokenDeploymentResult> {
    try {
      if (!this.agent) {
        throw new Error("Service not initialized. Please connect wallet first.");
      }

      // Deploy token with specified parameters
      const { mint } = await this.agent.deployToken(decimals);

      return {
        success: true,
        tokenAddress: mint.toBase58(),
      };
    } catch (error) {
      console.error("Token deployment failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Token deployment failed",
      };
    }
  }

  async createSwarm(agents: string[]): Promise<SwarmCreationResult> {
    try {
      if (!this.agent) {
        throw new Error("Service not initialized. Please connect wallet first.");
      }

      // Create a collection for the swarm
      const { mint: collectionMint } = await this.agent.deployCollection({
        name: "AI Swarm Collection",
        uri: "https://arweave.net/metadata.json",
        sellerFeeBasisPoints: 500, // 5% royalty
      });

      // Initialize swarm tools and register agents
      const tools = createSolanaTools(this.agent);

      // For each agent, mint an NFT in the collection
      for (const agent of agents) {
        await this.agent.mintCollectionNFT(
          collectionMint,
          {
            name: agent,
            uri: `https://arweave.net/${agent}.json`,
          }
        );
      }

      return {
        success: true,
        collectionAddress: collectionMint.toBase58(),
      };
    } catch (error) {
      console.error("Swarm creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Swarm creation failed",
      };
    }
  }
}

// Create a singleton instance
export const swarmTokenService = new SwarmTokenService();