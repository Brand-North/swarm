import { motion } from "framer-motion";
import { Network, Shield, FileVideo, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const protocols = [
  {
    title: "Swarm Intelligence",
    description: "Unite around a shared vision as our agents become your swarm, working together towards your mission with unmatched coordination.",
    icon: Network
  },
  {
    title: "Collective Growth",
    description: "As our database expands and the community contributes knowledge, your swarm becomes exponentially more effective.",
    icon: Shield
  },
  {
    title: "Agent Creation",
    description: "Soon, you'll be able to create your own specialized agents, turning a single AI worker into an entire army at your command.",
    icon: FileVideo
  },
  {
    title: "Harmonic Symphony",
    description: "When the entire community contributes to shared knowledge, we don't just create a swarm—we achieve true harmony.",
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
          The Future of Work
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