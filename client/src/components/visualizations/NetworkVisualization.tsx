import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ForceGraph2D } from "react-force-graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentType } from "@/types/agents";

interface Node {
  id: string;
  name: string;
  type: AgentType;
  val: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

interface Props {
  selectedAgents: AgentType[];
  isDeploying?: boolean;
}

export default function NetworkVisualization({ selectedAgents, isDeploying }: Props) {
  const [graphData, setGraphData] = useState<NetworkData>({ nodes: [], links: [] });
  const graphRef = useRef<any>();

  useEffect(() => {
    // Generate network data based on selected agents
    const nodes: Node[] = selectedAgents.map((type) => ({
      id: type,
      name: type.replace(/_/g, " "),
      type,
      val: type === AgentType.CEO ? 20 : 10,
    }));

    // Generate links from CEO to other agents
    const links: Link[] = selectedAgents
      .filter((type) => type !== AgentType.CEO)
      .map((type) => ({
        source: AgentType.CEO,
        target: type,
        value: 1,
      }));

    // Add cross-agent links based on dependencies
    const crossLinks: Link[] = [];
    if (selectedAgents.includes(AgentType.TOKEN_DEPLOYER) && selectedAgents.includes(AgentType.TRADER)) {
      crossLinks.push({
        source: AgentType.TOKEN_DEPLOYER,
        target: AgentType.TRADER,
        value: 0.5,
      });
    }
    if (selectedAgents.includes(AgentType.COLLECTION_DEPLOYER) && selectedAgents.includes(AgentType.NFT_MINTER)) {
      crossLinks.push({
        source: AgentType.COLLECTION_DEPLOYER,
        target: AgentType.NFT_MINTER,
        value: 0.5,
      });
    }

    setGraphData({
      nodes,
      links: [...links, ...crossLinks],
    });
  }, [selectedAgents]);

  // Custom node color based on agent type
  const getNodeColor = (node: Node) => {
    switch (node.type) {
      case AgentType.CEO:
        return "hsl(var(--primary))";
      case AgentType.TOKEN_DEPLOYER:
        return "hsl(var(--success))";
      case AgentType.COLLECTION_DEPLOYER:
        return "hsl(var(--warning))";
      case AgentType.NFT_MINTER:
        return "hsl(var(--info))";
      case AgentType.TRADER:
        return "hsl(var(--secondary))";
      case AgentType.LENDER:
        return "hsl(var(--destructive))";
      default:
        return "hsl(var(--muted))";
    }
  };

  useEffect(() => {
    if (isDeploying) {
      // Animate during deployment
      const interval = setInterval(() => {
        graphRef.current?.d3ReheatSimulation();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isDeploying]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neural Network Topology</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[400px] w-full"
          >
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeRelSize={6}
              nodeVal={(node: Node) => node.val}
              nodeLabel={(node: Node) => node.name}
              nodeColor={(node: Node) => getNodeColor(node as Node)}
              linkWidth={(link: Link) => link.value}
              cooldownTicks={100}
              linkDirectionalParticles={isDeploying ? 4 : 0}
              linkDirectionalParticleSpeed={0.01}
            />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}