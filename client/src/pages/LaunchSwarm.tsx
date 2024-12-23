import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AgentType, type AgentConfig } from "@/types/agents";
import { Network, Shield, FileCode2, Brain, Database } from "lucide-react";
import AgentHeatMap from "@/components/visualizations/AgentHeatMap";

const agents = [
  {
    name: "DOGE Commander",
    description: "Much Token, Very Deploy - The OG meme coin leader who deploys new tokens with wisdom and wit",
    type: AgentType.TOKEN_DEPLOYER,
    icon: Network,
    role: "Token Architect"
  },
  {
    name: "PEPE Master",
    description: "Rare Collection Creator - The legendary NFT collection deployer, turning memes into digital art",
    type: AgentType.COLLECTION_DEPLOYER,
    icon: Shield,
    role: "Collection Maestro"
  },
  {
    name: "SHIB Samurai",
    description: "Trading Warrior - The fearless trader who navigates the volatile seas of token swaps",
    type: AgentType.TRADER,
    icon: FileCode2,
    role: "Trade Strategist"
  },
  {
    name: "Bored APE Artist",
    description: "NFT Virtuoso - The creative force behind unique NFT minting operations",
    type: AgentType.NFT_MINTER,
    icon: Brain,
    role: "Mint Master"
  },
  {
    name: "SUSHI Chef",
    description: "DeFi Yield Master - The lending protocol expert who maximizes asset utilization",
    type: AgentType.LENDER,
    icon: Database,
    role: "Yield Optimizer"
  }
];

export default function LaunchSwarm() {
  const { toast } = useToast();
  const { connected } = useWallet();
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);
  const [swarmName, setSwarmName] = useState("");
  const [swarmPurpose, setSwarmPurpose] = useState("");
  const [neuralCapacity, setNeuralCapacity] = useState(2048);
  const [cognitiveVariance, setCognitiveVariance] = useState(0.9);

  const toggleAgent = (type: AgentType) => {
    setSelectedAgents(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const deploySwarm = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Phantom wallet to deploy the swarm",
        variant: "destructive"
      });
      return;
    }

    if (selectedAgents.length === 0) {
      toast({
        title: "No Agents Selected",
        description: "Please select at least one agent for your swarm",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deploying Neural Swarm",
      description: `Initializing ${selectedAgents.length} agents for ${swarmName}'s mission...`
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
          <h1 className="text-4xl font-bold mb-4">Neural Swarm Forge</h1>
          <p className="text-xl text-muted-foreground">
            Deploy your autonomous AI swarm on the blockchain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Swarm Configuration</CardTitle>
              <CardDescription>Configure your neural swarm parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Swarm Designation</label>
                <Input
                  placeholder="Name your swarm"
                  value={swarmName}
                  onChange={(e) => setSwarmName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Neural Blueprint</label>
                <Input
                  placeholder="Define your swarm's mission"
                  value={swarmPurpose}
                  onChange={(e) => setSwarmPurpose(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Neural Capacity: {neuralCapacity}</label>
                <Slider
                  value={[neuralCapacity]}
                  onValueChange={([value]) => setNeuralCapacity(value)}
                  max={4096}
                  min={1024}
                  step={256}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Cognitive Variance: {cognitiveVariance}</label>
                <Slider
                  value={[cognitiveVariance * 100]}
                  onValueChange={([value]) => setCognitiveVariance(value / 100)}
                  max={100}
                  min={10}
                  step={10}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Swarm Agents</CardTitle>
              <CardDescription>Choose your meme-powered blockchain agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <CardHeader className="py-4">
                      <div className="flex items-center gap-3">
                        <agent.icon className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>
                            <div className="font-medium text-primary/80">{agent.role}</div>
                            {agent.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {selectedAgents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AgentHeatMap selectedAgents={selectedAgents} />
          </motion.div>
        )}

        <div className="flex flex-col items-center gap-4">
          <WalletMultiButton />
          <Button
            size="lg"
            onClick={deploySwarm}
            className="bg-primary hover:bg-primary/90 w-full max-w-md"
            disabled={!connected || selectedAgents.length === 0}
          >
            {connected ? "Deploy Neural Swarm" : "Connect Wallet to Deploy"}
          </Button>
        </div>
      </div>
    </div>
  );
}