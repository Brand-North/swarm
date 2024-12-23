import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SwarmPreset, PresetCategory, AgentType } from "@/types/agents";
import { Rocket, Gem, Trophy, Coins, Star } from "lucide-react";

const presets: SwarmPreset[] = [
  {
    id: "meme-warfare",
    name: "Meme Warfare",
    description: "Deploy a viral meme token with maximum social engagement potential",
    agentTypes: [AgentType.TOKEN_DEPLOYER, AgentType.TRADER],
    neuralCapacity: 2048,
    cognitiveVariance: 0.8,
    category: PresetCategory.MEME,
    icon: "🚀"
  },
  {
    id: "nft-factory",
    name: "NFT Factory",
    description: "Launch and manage an NFT collection with automated minting",
    agentTypes: [AgentType.COLLECTION_DEPLOYER, AgentType.NFT_MINTER],
    neuralCapacity: 3072,
    cognitiveVariance: 0.7,
    category: PresetCategory.NFT,
    icon: "🎨"
  },
  {
    id: "defi-yield",
    name: "DeFi Yield",
    description: "Optimize yield farming across multiple protocols",
    agentTypes: [AgentType.TRADER, AgentType.LENDER],
    neuralCapacity: 4096,
    cognitiveVariance: 0.9,
    category: PresetCategory.YIELD,
    icon: "💰"
  }
];

const categoryIcons = {
  [PresetCategory.DEFI]: Coins,
  [PresetCategory.NFT]: Gem,
  [PresetCategory.TRADING]: Trophy,
  [PresetCategory.YIELD]: Star,
  [PresetCategory.MEME]: Rocket
};

interface PresetConfigsProps {
  onSelectPreset: (preset: SwarmPreset) => void;
}

export default function PresetConfigs({ onSelectPreset }: PresetConfigsProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handlePresetSelect = (preset: SwarmPreset) => {
    setSelectedPreset(preset.id);
    onSelectPreset(preset);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {presets.map((preset) => {
        const CategoryIcon = categoryIcons[preset.category];
        
        return (
          <motion.div
            key={preset.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-colors ${
                selectedPreset === preset.id
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handlePresetSelect(preset)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-primary">
                    <CategoryIcon className="w-4 h-4 mr-1" />
                    {preset.category}
                  </Badge>
                  <span className="text-2xl">{preset.icon}</span>
                </div>
                <CardTitle className="text-xl">{preset.name}</CardTitle>
                <CardDescription>{preset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Neural Capacity:</span>
                    <span className="font-medium">{preset.neuralCapacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cognitive Variance:</span>
                    <span className="font-medium">{(preset.cognitiveVariance * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {preset.agentTypes.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type.replace(/_/g, " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  variant={selectedPreset === preset.id ? "default" : "outline"}
                >
                  {selectedPreset === preset.id ? "Selected" : "Select Preset"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
