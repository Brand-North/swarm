import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Block {
  id: string;
  timestamp: number;
  transactions: number;
  position: {
    x: number;
    y: number;
  };
}

interface Props {
  isActive: boolean;
  width?: number;
  height?: number;
}

export default function BlockchainVisualizer({
  isActive = false,
  width = 600,
  height = 400
}: Props) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    const addBlock = () => {
      setBlocks(prevBlocks => {
        const newBlock: Block = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          transactions: Math.floor(Math.random() * 10) + 1,
          position: {
            x: Math.random() * (width - 100),
            y: Math.random() * (height - 100)
          }
        };

        // Keep only the last 10 blocks for performance
        const updatedBlocks = [...prevBlocks, newBlock].slice(-10);
        return updatedBlocks;
      });

      animationFrame.current = requestAnimationFrame(addBlock);
    };

    addBlock();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isActive, width, height]);

  return (
    <div
      className="relative bg-black/5 rounded-lg overflow-hidden"
      style={{ width, height }}
    >
      <AnimatePresence>
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            className="absolute"
            initial={{ scale: 0, x: block.position.x, y: block.position.y }}
            animate={{
              scale: 1,
              x: block.position.x,
              y: block.position.y
            }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-2 bg-primary/10 border-primary/20">
              <div className="text-xs text-primary/60">Block {index + 1}</div>
              <div className="text-sm font-medium text-primary">
                {block.transactions} tx
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(block.timestamp).toLocaleTimeString()}
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
