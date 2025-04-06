
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface MetricData {
  name: string;
  value: number;
  color: string;
}

interface ChartConfig {
  [key: string]: {
    color: string;
  };
}

const PerformanceMetrics = () => {
  const [metricsData, setMetricsData] = useState<MetricData[]>([
    { name: 'On-Time Assignments', value: 92, color: "#4CAF50" },
    { name: 'Class Participation', value: 78, color: "#2196F3" },
    { name: 'Behavior Score', value: 85, color: "#FFC107" },
    { name: 'Academic Performance', value: 88, color: "#9C27B0" }
  ]);

  const chartConfig: ChartConfig = {
    OnTimeAssignments: { color: "#4CAF50" },
    Participation: { color: "#2196F3" },
    Behavior: { color: "#FFC107" },
    Academic: { color: "#9C27B0" }
  };

  // Simulate data refresh when component mounts
  useEffect(() => {
    // Function to generate random data when no database is connected
    const generateRandomData = () => {
      const newData = [
        { 
          name: 'On-Time Assignments', 
          value: Math.floor(Math.random() * 30) + 70, 
          color: "#4CAF50" 
        },
        { 
          name: 'Class Participation', 
          value: Math.floor(Math.random() * 30) + 70, 
          color: "#2196F3" 
        },
        { 
          name: 'Behavior Score', 
          value: Math.floor(Math.random() * 30) + 70, 
          color: "#FFC107" 
        },
        { 
          name: 'Academic Performance', 
          value: Math.floor(Math.random() * 30) + 70, 
          color: "#9C27B0" 
        }
      ];
      setMetricsData(newData);
    };

    // Generate initial random data
    generateRandomData();

    // Set up data refresh interval (simulate real-time updates)
    const intervalId = setInterval(() => {
      generateRandomData();
    }, 60000); // Refresh every minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Student performance across key metrics</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer 
          config={chartConfig}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metricsData.map((metric) => (
              <div key={metric.name} className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                  <div className="text-sm font-medium">{metric.name}</div>
                </div>
                <div className="mt-2 text-2xl font-bold">{metric.value}%</div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
