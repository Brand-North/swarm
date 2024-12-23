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

const agents = [
  {
    name: "Tony Soprano",
    description: "Strategic Leader - Deploys tokens and manages operations",
    type: AgentType.TOKEN_DEPLOYER,
    icon: Network
  },
  {
    name: "Carmela Soprano",
    description: "The Matriarch - Handles NFT collection deployment",
    type: AgentType.COLLECTION_DEPLOYER,
    icon: Shield
  },
  {
    name: "Paulie Walnuts",
    description: "The Enforcer - Executes trades and manages assets",
    type: AgentType.TRADER,
    icon: FileCode2
  },
  {
    name: "Christopher Moltisanti",
    description: "The Protégé - Mints and manages NFTs",
    type: AgentType.NFT_MINTER,
    icon: Brain
  },
  {
    name: "Dr. Jennifer Melfi",
    description: "The Therapist - Handles lending operations",
    type: AgentType.LENDER,
    icon: Database
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

    // TODO: Implement swarm deployment using Solana Agent Kit
    toast({
      title: "Deploying Neural Swarm",
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
                  placeholder="Enter swarm name"
                  value={swarmName}
                  onChange={(e) => setSwarmName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Neural Blueprint</label>
                <Input
                  placeholder="Describe your swarm's purpose"
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
              <CardTitle>Agent Selection</CardTitle>
              <CardDescription>Choose your neural agents</CardDescription>
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
                          <CardDescription>{agent.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-4">
          <WalletMultiButton />

          <Button
            size="lg"
            onClick={deploySwarm}
            className="bg-primary hover:bg-primary/90 w-full max-w-md"
            disabled={!connected || selectedAgents.length === 0}
          >
            Deploy Neural Swarm
          </Button>
        </div>
      </div>
    </div>
  );
}