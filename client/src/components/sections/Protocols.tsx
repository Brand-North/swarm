import { motion } from "framer-motion";
import { Network, Shield, FileVideo, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const protocols = [
  {
    title: "Viral Amplification Protocol",
    description: "Deploy neural swarms to generate viral content matrices, manipulate trend algorithms, and orchestrate cross-platform social engagement vectors.",
    icon: Network
  },
  {
    title: "Neural Defense Grid",
    description: "Autonomous moderation swarms powered by advanced pattern recognition algorithms to maintain community integrity across digital spaces.",
    icon: Shield
  },
  {
    title: "Content Synthesis Engine",
    description: "Collaborative AI matrices generating multi-platform content streams, from video algorithms to memetic warfare campaigns.",
    icon: FileVideo
  },
  {
    title: "Data Nexus Core",
    description: "Quantum-enhanced data aggregation systems for real-time trend analysis and strategic optimization protocols.",
    icon: Database
  }
];

export default function Protocols() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Experimental Protocols
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
                <CardTitle className="text-2xl mb-2">{protocol.title}</CardTitle>
                <CardDescription className="text-lg">
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