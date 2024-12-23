import { useState, useEffect, useCallback, useMemo } from "react";
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

  // Initialize swarm agents with memoized initial positions
  useEffect(() => {
    const newAgents = selectedAgents.map((type, index) => ({
      id: `${type}-${index}`,
      x: Math.random() * (width - 50) + 25, // Keep away from edges
      y: Math.random() * (height - 50) + 25,
      type,
      angle: Math.random() * Math.PI * 2,
      velocity: 1 + Math.random(), // Reduced base velocity for smoother movement
      collaboratingWith: [],
      energy: 100
    }));
    setAgents(newAgents);
  }, [selectedAgents, width, height]);

  // Memoize collaboration detection distance
  const COLLABORATION_DISTANCE = useMemo(() => Math.min(width, height) * 0.2, [width, height]);

  // Update agent positions and interactions with optimized calculations
  const updatePositions = useCallback(() => {
    setAgents(prevAgents => {
      return prevAgents.map(agent => {
        // Find nearby agents with optimized distance calculation
        const nearby = prevAgents.filter(other => {
          if (other.id === agent.id) return false;
          const dx = other.x - agent.x;
          const dy = other.y - agent.y;
          return (dx * dx + dy * dy) < COLLABORATION_DISTANCE * COLLABORATION_DISTANCE;
        });

        // Update collaborations
        const collaboratingWith = nearby.map(n => n.id);

        // Calculate average direction of nearby agents
        let avgAngle = agent.angle;
        if (nearby.length > 0) {
          const sumAngles = nearby.reduce((sum, other) => sum + other.angle, 0);
          avgAngle = sumAngles / nearby.length;
        }

        // Add smooth noise to movement
        const noise = (Math.random() - 0.5) * 0.1; // Reduced noise for smoother movement
        const newAngle = avgAngle + noise;

        // Update position with smoother movement
        let newX = agent.x + Math.cos(newAngle) * agent.velocity;
        let newY = agent.y + Math.sin(newAngle) * agent.velocity;

        // Smooth edge wrapping with buffer zone
        const buffer = 20;
        if (newX < buffer) newX = width - buffer;
        if (newX > width - buffer) newX = buffer;
        if (newY < buffer) newY = height - buffer;
        if (newY > height - buffer) newY = buffer;

        // Update energy based on collaborations with smoother transitions
        const targetEnergy = Math.min(100, 60 + (collaboratingWith.length * 10));
        const currentEnergy = agent.energy;
        const newEnergy = currentEnergy + (targetEnergy - currentEnergy) * 0.1;

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
  }, [width, height, COLLABORATION_DISTANCE]);

  // Animation loop with performance optimization
  useEffect(() => {
    if (!isActive) return;

    let frameId: number;
    let lastUpdate = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= frameInterval) {
        updatePositions();
        lastUpdate = timestamp;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
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
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            {/* Draw collaboration lines */}
            {agents.map(agent => 
              agent.collaboratingWith.map(collaboratorId => {
                const collaborator = agents.find(a => a.id === collaboratorId);
                if (!collaborator) return null;

                return (
                  <line
                    key={`${agent.id}-${collaboratorId}`}
                    x1={agent.x}
                    y1={agent.y}
                    x2={collaborator.x}
                    y2={collaborator.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/20"
                  />
                );
              })
            )}
          </svg>

          <AnimatePresence>
            {/* Draw agents */}
            {agents.map(agent => (
              <motion.div
                key={agent.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: agent.x,
                  top: agent.y,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: (agent.angle * 180) / Math.PI
                }}
                exit={{ scale: 0 }}
                transition={{ 
                  type: "spring",
                  damping: 20,
                  stiffness: 300
                }}
              >
                {/* Agent body */}
                <div 
                  className="w-4 h-4 rounded-full bg-primary relative"
                  style={{
                    opacity: 0.4 + (agent.energy / 200),
                  }}
                >
                  {/* Collaboration indicator */}
                  {agent.collaboratingWith.length > 0 && (
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
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