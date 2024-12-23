import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Active Neural Networks", value: "2,547" },
  { label: "Daily Operations", value: "1.2M+" },
  { label: "Processing Power", value: "850 TH/s" }
];

export default function Stats() {
  return (
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/30 backdrop-blur border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
