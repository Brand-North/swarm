import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="min-h-[90vh] relative flex items-center justify-center overflow-hidden px-4 sm:min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0" />

      {/* Star field background */}
      <div 
        className="absolute inset-0 opacity-20 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa")'
        }}
      />

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-4 text-xs sm:text-sm uppercase tracking-wider text-primary/80 font-light">
            Decentralized AI Agents Working Together
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 font-sans max-w-4xl mx-auto">
            swarmintelligenceai
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto font-light tracking-wide px-4">
            The Power of Many—Swarm AI Agents That Work, Think, and Deliver Together
          </p>
          <div className="flex justify-center">
            <Link href="/launch">
              <Button 
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-primary hover:bg-primary/90 font-medium tracking-wide w-full sm:w-auto"
              >
                Launch Your Swarm
              </Button>
            </Link>
          </div>
          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-12 text-base sm:text-lg italic text-muted-foreground max-w-2xl mx-auto px-4"
          >
            "A swarm is tens of thousands of volunteers working toward a common goal. Imagine that kind of momentum—an entire hive mind focused on your mission."
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}