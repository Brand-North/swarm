import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentType } from "@/types/agents";

interface SwarmAgent {
  id: string;
  x: number;
  y: number;
  type: AgentType;
  angle: number;
  velocity: number;
}

interface Props {
  selectedAgents: AgentType[];
  isActive?: boolean;
  width?: number;
  height?: number;
}

export default function SwarmFormationSimulator({ 
  selectedAgents,
  isActive = true,
  width = 600,
  height = 400 
}: Props) {
  const [agents, setAgents] = useState<SwarmAgent[]>([]);
  
  // Initialize swarm agents
  useEffect(() => {
    const newAgents = selectedAgents.map((type, index) => ({
      id: `${type}-${index}`,
      x: Math.random() * width,
      y: Math.random() * height,
      type,
      angle: Math.random() * Math.PI * 2,
      velocity: 2 + Math.random()
    }));
    setAgents(newAgents);
  }, [selectedAgents, width, height]);

  // Update agent positions based on swarm behavior
  const updatePositions = useCallback(() => {
    setAgents(prevAgents => {
      return prevAgents.map(agent => {
        // Find nearby agents
        const nearby = prevAgents.filter(other => 
          other.id !== agent.id && 
          Math.hypot(other.x - agent.x, other.y - agent.y) < 100
        );

        // Calculate average direction of nearby agents
        let avgAngle = agent.angle;
        if (nearby.length > 0) {
          avgAngle = nearby.reduce((sum, other) => sum + other.angle, 0) / nearby.length;
        }

        // Add some randomness to movement
        const noise = (Math.random() - 0.5) * 0.2;
        const newAngle = avgAngle + noise;

        // Update position
        let newX = agent.x + Math.cos(newAngle) * agent.velocity;
        let newY = agent.y + Math.sin(newAngle) * agent.velocity;

        // Keep agents within bounds
        if (newX < 0) newX = width;
        if (newX > width) newX = 0;
        if (newY < 0) newY = height;
        if (newY > height) newY = 0;

        return {
          ...agent,
          x: newX,
          y: newY,
          angle: newAngle
        };
      });
    });
  }, [width, height]);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(updatePositions, 50);
    return () => clearInterval(interval);
  }, [isActive, updatePositions]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Swarm Formation Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="relative bg-black/5 rounded-lg overflow-hidden"
          style={{ width, height }}
        >
          <AnimatePresence>
            {agents.map(agent => (
              <motion.div
                key={agent.id}
                className="absolute w-4 h-4 rounded-full bg-primary"
                style={{
                  left: agent.x - 8,
                  top: agent.y - 8,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  x: agent.x,
                  y: agent.y,
                  rotate: (agent.angle * 180) / Math.PI
                }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", damping: 20 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
