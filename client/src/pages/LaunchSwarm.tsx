import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AgentType, type AgentConfig } from "@/types/agents";
import { Network, FileCode2, Image, RepeatIcon, Wallet } from "lucide-react";

const agents: AgentConfig[] = [
  {
    name: "Token Deployer",
    description: "Deploy new SPL tokens with customizable parameters",
    type: AgentType.TOKEN_DEPLOYER,
    icon: FileCode2
  },
  {
    name: "Collection Deployer",
    description: "Create and manage NFT collections with royalties",
    type: AgentType.COLLECTION_DEPLOYER,
    icon: Network
  },
  {
    name: "NFT Minter",
    description: "Mint new NFTs into existing collections",
    type: AgentType.NFT_MINTER,
    icon: Image
  },
  {
    name: "Trader",
    description: "Execute token swaps with optimal routing",
    type: AgentType.TRADER,
    icon: RepeatIcon
  },
  {
    name: "Lender",
    description: "Lend assets to earn interest on Solana",
    type: AgentType.LENDER,
    icon: Wallet
  }
];

export default function LaunchSwarm() {
  const { toast } = useToast();
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);

  const toggleAgent = (type: AgentType) => {
    setSelectedAgents(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const launchSwarm = () => {
    if (selectedAgents.length === 0) {
      toast({
        title: "No Agents Selected",
        description: "Please select at least one agent to launch a swarm",
        variant: "destructive"
      });
      return;
    }

    // TODO: Navigate to the individual agent pages based on selection
    toast({
      title: "Launching Swarm",
      description: `Initializing ${selectedAgents.length} agents...`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Launch Your Agent Swarm</h1>
          <p className="text-xl text-muted-foreground">
            Select the agents you want to deploy in your swarm
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <motion.div
              key={agent.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedAgents.includes(agent.type)
                    ? "border-primary bg-primary/10"
                    : ""
                }`}
                onClick={() => toggleAgent(agent.type)}
              >
                <CardHeader>
                  <agent.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={launchSwarm}
            className="bg-primary hover:bg-primary/90"
            disabled={selectedAgents.length === 0}
          >
            Launch Swarm ({selectedAgents.length} Agents)
          </Button>
        </motion.div>
      </div>
    </div>
  );
}