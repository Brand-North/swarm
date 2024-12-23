import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentType } from "@/types/agents";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

interface AgentActivity {
  agent: string;
  performance: number;
  activity: number;
  value: number;
}

const generateMockData = (agents: AgentType[]): AgentActivity[] => {
  return agents.map((agent) => ({
    agent,
    performance: Math.random() * 100,
    activity: Math.random() * 100,
    value: Math.random() * 100
  }));
};

export default function AgentHeatMap({ selectedAgents }: { selectedAgents: AgentType[] }) {
  const [data, setData] = useState<AgentActivity[]>([]);

  useEffect(() => {
    // Initial data
    setData(generateMockData(selectedAgents));

    // Update data every 3 seconds
    const interval = setInterval(() => {
      setData(generateMockData(selectedAgents));
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedAgents]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agent Performance Heat Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis
                type="number"
                dataKey="performance"
                name="Performance"
                unit="%"
                domain={[0, 100]}
              />
              <YAxis
                type="number"
                dataKey="activity"
                name="Activity"
                unit="%"
                domain={[0, 100]}
              />
              <ZAxis
                type="number"
                dataKey="value"
                range={[100, 500]}
                name="Value"
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-2 shadow-lg">
                        <p className="font-medium text-primary">{data.agent}</p>
                        <p className="text-sm text-muted-foreground">
                          Performance: {data.performance.toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Activity: {data.activity.toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Value: {data.value.toFixed(1)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={data}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${entry.value * 3.6}, 70%, 50%)`}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
