import { motion } from "framer-motion";
import { Users, Cpu, Shield, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Specialized AI Workforce",
    description: "Deploy highly specialized AI agents that can handle practically any task, working together in perfect coordination.",
    icon: Users
  },
  {
    title: "Never-Ending Productivity",
    description: "Your AI swarm works 24/7, continuously learning and improving while maintaining laser focus on your mission.",
    icon: Cpu
  },
  {
    title: "Built-in Kill Switch",
    description: "Enterprise-grade control mechanisms ensure your AI swarm stays aligned with your goals and ethical boundaries.",
    icon: Shield
  },
  {
    title: "Exponential Growth",
    description: "As our shared knowledge base expands, your swarm becomes increasingly efficient at accomplishing your goals.",
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
          <h2 className="text-4xl font-semibold tracking-tight mb-4">The Power of Many</h2>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            Turn a single AI worker into an entire agent army at your command
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