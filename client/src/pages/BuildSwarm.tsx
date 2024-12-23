import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { characters } from "@/data/characters";
import { useWallet } from '@solana/wallet-adapter-react';
import { Character } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { swarmTokenService } from "@/services/swarm-token";

export default function BuildSwarm() {
  const { connect, connected, connecting, publicKey } = useWallet();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);
  const { toast } = useToast();

  // Initialize service when wallet is connected
  useEffect(() => {
    if (connected && publicKey) {
      swarmTokenService.initialize(publicKey)
        .catch(error => {
          console.error("Service initialization failed:", error);
          toast({
            title: "Service Initialization Failed",
            description: error instanceof Error ? error.message : "Failed to initialize swarm service",
            variant: "destructive",
          });
        });
    }
  }, [connected, publicKey, toast]);

  const handleAgentSelection = (name: string) => {
    setSelectedAgents(prev => 
      prev.includes(name) 
        ? prev.filter(agent => agent !== name)
        : [...prev, name]
    );
  };

  const handleConnect = async () => {
    try {
      if (connect) {
        await connect();
      } else {
        toast({
          title: "Error",
          description: "Wallet connection not available",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDeploy = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (selectedAgents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one agent for your swarm",
        variant: "destructive",
      });
      return;
    }

    setDeploying(true);
    try {
      // Deploy token first
      const tokenResult = await swarmTokenService.deployToken();
      if (!tokenResult.success) {
        throw new Error(tokenResult.error);
      }

      // Create swarm with selected agents
      const swarmResult = await swarmTokenService.createSwarm(selectedAgents);
      if (!swarmResult.success) {
        throw new Error(swarmResult.error);
      }

      toast({
        title: "Success",
        description: `Swarm deployed successfully!\nToken: ${tokenResult.tokenAddress}\nCollection: ${swarmResult.collectionAddress}`,
      });
    } catch (error) {
      console.error("Deployment failed:", error);
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "Failed to deploy swarm",
        variant: "destructive",
      });
    } finally {
      setDeploying(false);
    }
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

            {/* Wallet Connection & Deploy */}
            <Card>
              <CardContent className="p-6">
                {!connected ? (
                  <Button 
                    onClick={handleConnect}
                    className="w-full"
                    size="lg"
                    disabled={connecting}
                  >
                    {connecting ? "Connecting..." : "Connect Phantom Wallet"}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleDeploy}
                    className="w-full"
                    size="lg"
                    disabled={deploying}
                  >
                    {deploying ? "Deploying Swarm..." : "Deploy Swarm"}
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