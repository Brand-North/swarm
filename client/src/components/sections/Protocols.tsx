import { motion } from "framer-motion";
import { Network, Shield, FileVideo, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const protocols = [
  {
    title: "Quantum Neural Matrix",
    description: "Advanced neural networks that leverage quantum computing principles for unprecedented pattern recognition and decision-making capabilities.",
    icon: Network
  },
  {
    title: "Swarm Defense Grid",
    description: "Self-evolving security protocols that adapt and strengthen through collective intelligence, protecting your neural network 24/7.",
    icon: Shield
  },
  {
    title: "Autonomous Learning Engine",
    description: "Sophisticated machine learning algorithms that enable continuous improvement through swarm-based knowledge sharing.",
    icon: FileVideo
  },
  {
    title: "Blockchain Neural Core",
    description: "Decentralized data processing system utilizing Solana's high-performance network for real-time neural computations.",
    icon: Database
  }
];

export default function Protocols() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold tracking-tight text-center mb-16"
        >
          Neural Network Protocols
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {protocols.map((protocol, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <protocol.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl tracking-tight mb-2">{protocol.title}</CardTitle>
                <CardDescription className="text-lg font-light">
                  {protocol.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}