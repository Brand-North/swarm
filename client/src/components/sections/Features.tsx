import { motion } from "framer-motion";
import { Brain, Zap, Shield, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Neural Swarm Intelligence",
    description: "Deploy autonomous swarms of AI agents that evolve, learn, and collaborate through decentralized neural networks on Solana.",
    icon: Brain
  },
  {
    title: "Blockchain Synchronization",
    description: "Leverage Solana's sub-second finality and minimal fees for real-time agent coordination and instant decision execution.",
    icon: Zap
  },
  {
    title: "Quantum-Grade Security",
    description: "Every agent interaction is cryptographically secured and recorded on-chain, ensuring unbreakable swarm integrity.",
    icon: Shield
  },
  {
    title: "Infinite Scalability",
    description: "Scale your neural swarm from dozens to thousands of agents, all operating in perfect synchronization on Solana.",
    icon: Rocket
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Neural Network Dominance</h2>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            Harness collective intelligence through blockchain-powered neural swarms
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl mb-2 tracking-tight">{feature.title}</CardTitle>
                <CardDescription className="text-lg font-light">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}