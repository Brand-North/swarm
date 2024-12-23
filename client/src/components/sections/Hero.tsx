import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0" />

      {/* Star field background */}
      <div 
        className="absolute inset-0 opacity-20 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa")'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-2 text-sm uppercase tracking-wider text-primary/80 font-light">
            Decentralized AI Agents Working Together
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 font-sans">
            swarmintelligenceai
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto font-light tracking-wide">
            Picture this: Not just one AI assistant, but an entire specialized workforce at your command. Welcome to the future of AI coordination.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/launch">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 font-medium tracking-wide"
              >
                Launch Your Swarm
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground font-light tracking-wider">
              Powered by Solana's high-performance blockchain
            </div>
          </div>
          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-lg italic text-muted-foreground max-w-2xl mx-auto"
          >
            "Swarm intelligence emerges when we unite around a shared vision. You set the goal—our agents become the swarm."
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}