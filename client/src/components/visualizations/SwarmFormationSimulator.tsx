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
  collaboratingWith: string[];
  energy: number;
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
      velocity: 2 + Math.random(),
      collaboratingWith: [],
      energy: 100
    }));
    setAgents(newAgents);
  }, [selectedAgents, width, height]);

  // Update agent positions and interactions
  const updatePositions = useCallback(() => {
    setAgents(prevAgents => {
      return prevAgents.map(agent => {
        // Find nearby agents
        const nearby = prevAgents.filter(other => 
          other.id !== agent.id && 
          Math.hypot(other.x - agent.x, other.y - agent.y) < 100
        );

        // Update collaborations
        const collaboratingWith = nearby.map(n => n.id);

        // Calculate average direction of nearby agents
        let avgAngle = agent.angle;
        if (nearby.length > 0) {
          avgAngle = nearby.reduce((sum, other) => sum + other.angle, 0) / nearby.length;
        }

        // Add some randomness to movement
        const noise = (Math.random() - 0.5) * 0.2;
        const newAngle = avgAngle + noise;

        // Update position with smoother movement
        let newX = agent.x + Math.cos(newAngle) * agent.velocity;
        let newY = agent.y + Math.sin(newAngle) * agent.velocity;

        // Keep agents within bounds with smooth wrapping
        if (newX < 0) newX = width;
        if (newX > width) newX = 0;
        if (newY < 0) newY = height;
        if (newY > height) newY = 0;

        // Update energy based on collaborations
        const newEnergy = Math.min(100, agent.energy + (collaboratingWith.length * 0.5));

        return {
          ...agent,
          x: newX,
          y: newY,
          angle: newAngle,
          collaboratingWith,
          energy: newEnergy
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
            {/* Draw collaboration lines */}
            {agents.map(agent => 
              agent.collaboratingWith.map(collaboratorId => {
                const collaborator = agents.find(a => a.id === collaboratorId);
                if (!collaborator) return null;

                return (
                  <motion.line
                    key={`${agent.id}-${collaboratorId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    x1={agent.x}
                    y1={agent.y}
                    x2={collaborator.x}
                    y2={collaborator.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary absolute"
                  />
                );
              })
            )}

            {/* Draw agents */}
            {agents.map(agent => (
              <motion.div
                key={agent.id}
                className="absolute"
                style={{
                  left: agent.x - 8,
                  top: agent.y - 8,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: (agent.angle * 180) / Math.PI
                }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                {/* Agent body */}
                <div 
                  className={`w-4 h-4 rounded-full bg-primary relative`}
                  style={{
                    opacity: 0.4 + (agent.energy / 200), // Fade based on energy
                  }}
                >
                  {/* Collaboration indicator */}
                  {agent.collaboratingWith.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}