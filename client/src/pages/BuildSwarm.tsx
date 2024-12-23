import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { characters } from "@/data/characters";
import { useWallet } from '@solana/wallet-adapter-react';
import { Character } from "@/types";

export default function BuildSwarm() {
  const { connect, connected } = useWallet();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleAgentSelection = (name: string) => {
    setSelectedAgents(prev => 
      prev.includes(name) 
        ? prev.filter(agent => agent !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Neural Swarm Forge</h1>
          <p className="text-xl text-center mb-12 text-muted-foreground">
            Deploy your autonomous AI swarm on the blockchain
          </p>

          <div className="space-y-8">
            {/* Neural Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Neural Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Swarm Designation</label>
                  <Input placeholder="Enter swarm name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Neural Blueprint</label>
                  <Textarea placeholder="Describe your swarm's purpose" />
                </div>
              </CardContent>
            </Card>

            {/* Agent Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {characters.map((character: Character) => (
                    <Card 
                      key={character.name}
                      className={`cursor-pointer transition-colors ${
                        selectedAgents.includes(character.name) 
                          ? 'border-primary' 
                          : 'border-border'
                      }`}
                      onClick={() => handleAgentSelection(character.name)}
                    >
                      <CardContent className="p-4">
                        <img 
                          src={character.image} 
                          alt={character.name} 
                          className="w-20 h-20 rounded-full mx-auto mb-4"
                        />
                        <h3 className="font-bold text-center mb-1">{character.name}</h3>
                        <p className="text-sm text-center text-muted-foreground">{character.role}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Primary Directive & Neural Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Swarm Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Directive</label>
                  <Textarea placeholder="Define the swarm's objective" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Neural Capacity</label>
                  <Slider 
                    defaultValue={[2048]} 
                    max={4096} 
                    min={512} 
                    step={512}
                    className="py-4"
                  />
                  <span className="text-sm text-muted-foreground">2048 tokens</span>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Cognitive Variance</label>
                  <Slider 
                    defaultValue={[0.9]} 
                    max={1} 
                    min={0} 
                    step={0.1}
                    className="py-4"
                  />
                  <span className="text-sm text-muted-foreground">0.9</span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Connection & Deploy */}
            <Card>
              <CardContent className="p-6">
                {!connected ? (
                  <Button 
                    onClick={() => connect()}
                    className="w-full"
                    size="lg"
                  >
                    Connect Phantom Wallet
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {/* Deploy logic */}}
                    className="w-full"
                    size="lg"
                  >
                    Deploy Swarm
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}