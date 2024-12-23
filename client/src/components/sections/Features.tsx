import { motion } from "framer-motion";
import { Network, Share2, FileCode2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Autonomous AI Swarms",
    description: "Build and deploy decentralized swarms of agents that communicate and collaborate autonomously.",
    icon: Network
  },
  {
    title: "Cross-Platform Integration",
    description: "Seamless interaction across Twitter, Reddit, Telegram, TikTok, and YouTube platforms.",
    icon: Share2
  },
  {
    title: "Smart Contracts",
    description: "Autonomous execution of contracts for micropayments and asset management.",
    icon: FileCode2
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
