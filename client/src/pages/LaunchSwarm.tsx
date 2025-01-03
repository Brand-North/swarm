import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AgentType, CEOPersonalityTrait, type AgentConfig, SwarmPreset } from "@/types/agents";
import { Network, Shield, FileCode2, Brain, Database, Crown } from "lucide-react";
import AgentHeatMap from "@/components/visualizations/AgentHeatMap";
import NetworkVisualization from "@/components/visualizations/NetworkVisualization";
import PresetConfigs from "@/components/presets/PresetConfigs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeploymentWizard from "@/components/wizard/DeploymentWizard";
import SwarmFormationSimulator from "@/components/visualizations/SwarmFormationSimulator";

const agents = [
  {
    name: "DOGE CEO",
    description: "First AI CEO on Solana - The visionary leader who coordinates and delegates tasks to other agents for maximum efficiency",
    type: AgentType.CEO,
    icon: Crown,
    role: "Swarm Commander"
  },
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
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([AgentType.CEO]);
  const [swarmName, setSwarmName] = useState("");
  const [swarmPurpose, setSwarmPurpose] = useState("");
  const [ceoGoal, setCeoGoal] = useState("");
  const [neuralCapacity, setNeuralCapacity] = useState(2048);
  const [cognitiveVariance, setCognitiveVariance] = useState(0.9);
  const [activeTab, setActiveTab] = useState<string>("custom");
  const [isDeploying, setIsDeploying] = useState(false);
  const [ceoPersonality, setCeoPersonality] = useState<CEOPersonalityTrait>(CEOPersonalityTrait.VISIONARY);
  const [riskTolerance, setRiskTolerance] = useState(0.5);
  const [innovationFactor, setInnovationFactor] = useState(0.5);
  const [decisionSpeed, setDecisionSpeed] = useState(0.5);
  const [showWizard, setShowWizard] = useState(true);

  const toggleAgent = (type: AgentType) => {
    setSelectedAgents(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePresetSelect = (preset: SwarmPreset) => {
    setSelectedAgents(preset.agentTypes);
    setNeuralCapacity(preset.neuralCapacity);
    setCognitiveVariance(preset.cognitiveVariance);
    setSwarmName(`${preset.name} Swarm`);
    setSwarmPurpose(preset.description);
    if (preset.ceoPersonality) {
      setCeoPersonality(preset.ceoPersonality);
      switch (preset.ceoPersonality) {
        case CEOPersonalityTrait.AGGRESSIVE:
          setRiskTolerance(0.8);
          setInnovationFactor(0.7);
          setDecisionSpeed(0.9);
          break;
        case CEOPersonalityTrait.ANALYTICAL:
          setRiskTolerance(0.4);
          setInnovationFactor(0.6);
          setDecisionSpeed(0.3);
          break;
        case CEOPersonalityTrait.INNOVATIVE:
          setRiskTolerance(0.6);
          setInnovationFactor(0.9);
          setDecisionSpeed(0.7);
          break;
      }
    }
    setActiveTab("custom");

    toast({
      title: "Preset Selected",
      description: `Loaded ${preset.name} configuration with ${preset.ceoPersonality?.toLowerCase()} CEO personality.`
    });
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

    setIsDeploying(true);
    toast({
      title: "Deploying Neural Swarm",
      description: `Initializing ${selectedAgents.length} agents for ${swarmName}'s mission...`
    });

    setTimeout(() => {
      setIsDeploying(false);
    }, 5000);
  };

  const handleWizardComplete = (wizardData: any) => {
    if (wizardData.selectedPreset) {
      handlePresetSelect(wizardData.selectedPreset);
    }

    setCeoGoal(wizardData.ceoConfiguration.goal);
    setCeoPersonality(wizardData.ceoConfiguration.personality);
    setRiskTolerance(wizardData.ceoConfiguration.riskTolerance);
    setInnovationFactor(wizardData.ceoConfiguration.innovationFactor);
    setDecisionSpeed(wizardData.ceoConfiguration.decisionSpeed);

    setShowWizard(false);
  };

  const handlePersonalityChange = (value: string) => {
    setCeoPersonality(value as CEOPersonalityTrait);
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

        {showWizard ? (
          <DeploymentWizard
            onComplete={handleWizardComplete}
            onCancel={() => setShowWizard(false)}
          />
        ) : (
          <>
            <Button
              onClick={() => setShowWizard(true)}
              variant="outline"
              className="mb-6"
            >
              Back to Wizard
            </Button>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="presets">Quick Deploy Presets</TabsTrigger>
                <TabsTrigger value="custom">Custom Configuration</TabsTrigger>
              </TabsList>

              <TabsContent value="presets" className="mt-6">
                <PresetConfigs onSelectPreset={handlePresetSelect} />
              </TabsContent>

              <TabsContent value="custom">
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
                        <label className="text-sm font-medium mb-2 block">CEO's Strategic Goal</label>
                        <Input
                          placeholder="Define the goal for your AI CEO"
                          value={ceoGoal}
                          onChange={(e) => setCeoGoal(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">CEO Personality</label>
                        <Select
                          value={ceoPersonality}
                          onValueChange={(value: string) => handlePersonalityChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select personality type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(CEOPersonalityTrait).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value.charAt(0) + value.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Risk Tolerance</label>
                        <Slider
                          value={[riskTolerance * 100]}
                          onValueChange={([value]) => setRiskTolerance(value / 100)}
                          max={100}
                          min={0}
                          step={10}
                          className="py-2"
                        />
                        <p className="text-sm text-muted-foreground">
                          {riskTolerance < 0.3 ? "Conservative" :
                            riskTolerance < 0.7 ? "Balanced" : "Aggressive"}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Innovation Factor</label>
                        <Slider
                          value={[innovationFactor * 100]}
                          onValueChange={([value]) => setInnovationFactor(value / 100)}
                          max={100}
                          min={0}
                          step={10}
                          className="py-2"
                        />
                        <p className="text-sm text-muted-foreground">
                          {innovationFactor < 0.3 ? "Traditional" :
                            innovationFactor < 0.7 ? "Balanced" : "Disruptive"}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Decision Speed</label>
                        <Slider
                          value={[decisionSpeed * 100]}
                          onValueChange={([value]) => setDecisionSpeed(value / 100)}
                          max={100}
                          min={0}
                          step={10}
                          className="py-2"
                        />
                        <p className="text-sm text-muted-foreground">
                          {decisionSpeed < 0.3 ? "Methodical" :
                            decisionSpeed < 0.7 ? "Balanced" : "Swift"}
                        </p>
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
                                    <span className="font-medium text-primary/80 block">{agent.role}</span>
                                    <span className="block">{agent.description}</span>
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
              </TabsContent>
            </Tabs>

            {selectedAgents.length > 0 && (
              <div className="space-y-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AgentHeatMap selectedAgents={selectedAgents} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <NetworkVisualization
                      selectedAgents={selectedAgents}
                      isDeploying={isDeploying}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SwarmFormationSimulator
                    selectedAgents={selectedAgents}
                    isActive={!isDeploying}
                    width={window.innerWidth > 768 ? 800 : 350}
                    height={300}
                  />
                </motion.div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <WalletMultiButton />
              <Button
                size="lg"
                onClick={deploySwarm}
                className="bg-primary hover:bg-primary/90 w-full max-w-md"
                disabled={isDeploying || !connected || selectedAgents.length === 0}
              >
                {isDeploying
                  ? "Deploying Neural Swarm..."
                  : connected
                    ? "Deploy Neural Swarm"
                    : "Connect Wallet to Deploy"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}