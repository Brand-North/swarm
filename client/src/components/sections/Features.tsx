import { motion } from "framer-motion";
import { Zap, Network, Shield, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Swarm Intelligence",
    description: "Deploy decentralized swarms of AI agents that communicate, learn, and evolve together on Solana's high-performance network.",
    icon: Network
  },
  {
    title: "Lightning-Fast Execution",
    description: "Leverage Solana's sub-second finality and minimal fees for real-time agent coordination and task execution.",
    icon: Zap
  },
  {
    title: "Secure & Transparent",
    description: "Every agent interaction is recorded on-chain, ensuring complete transparency and immutable audit trails.",
    icon: Shield
  },
  {
    title: "Scalable Performance",
    description: "Seamlessly scale your swarm from a few agents to thousands, all operating in perfect synchronization.",
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
          <h2 className="text-4xl font-bold mb-4">Power of the Swarm</h2>
          <p className="text-xl text-muted-foreground">
            Harness collective intelligence through decentralized collaboration
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-lg">
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