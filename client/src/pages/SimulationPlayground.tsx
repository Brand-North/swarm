import { useState } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import BlockchainVisualizer from "@/components/visualizations/BlockchainVisualizer";

export default function SimulationPlayground() {
  const { toast } = useToast();
  const { connected, publicKey } = useWallet();
  const [transactionSpeed, setTransactionSpeed] = useState<number>(1000);
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to start the simulation",
        variant: "destructive"
      });
      return;
    }

    setIsSimulating(true);
    // Simulation logic will be added here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Blockchain Interaction Playground</h1>
          <p className="text-xl text-muted-foreground">
            Simulate and visualize blockchain interactions in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
              <CardDescription>Configure your blockchain simulation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Transaction Speed (ms)</label>
                <Input
                  type="number"
                  value={transactionSpeed}
                  onChange={(e) => setTransactionSpeed(Number(e.target.value))}
                  min={100}
                  max={5000}
                />
              </div>
              <Button
                onClick={startSimulation}
                disabled={isSimulating || !connected}
                className="w-full"
              >
                {isSimulating ? "Simulation Running..." : "Start Simulation"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
              <CardDescription>Real-time blockchain interaction visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <BlockchainVisualizer isActive={isSimulating} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
