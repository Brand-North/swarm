import { motion } from "framer-motion";
import { Users, Cpu, Shield, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Insanely Effective Agents",
    description: "We build specialized AI workers that can handle practically any task you throw at them, working together in perfect coordination.",
    icon: Users
  },
  {
    title: "Coordinated Force",
    description: "Your AI swarm works 24/7, creating a unified force that never sleeps, continuously learning and improving.",
    icon: Cpu
  },
  {
    title: "Enterprise Control",
    description: "With great AI power comes great responsibility. That's why we built a kill switch—keeping everything in perfect check.",
    icon: Shield
  },
  {
    title: "Community Knowledge",
    description: "As our shared knowledge base expands, we accomplish goals faster and faster, achieving true swarm harmony.",
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
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Democratizing AI</h2>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            We're witnessing it right here, right now—specialized agents working together as one
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