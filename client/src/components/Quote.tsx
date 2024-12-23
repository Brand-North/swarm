import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface QuoteProps {
  text: string;
  author: string;
}

export default function Quote({ text, author }: QuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8">
          <blockquote className="text-xl italic mb-4">"{text}"</blockquote>
          <cite className="text-primary font-medium">— {author}</cite>
        </CardContent>
      </Card>
    </motion.div>
  );
}
