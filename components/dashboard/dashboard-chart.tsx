"use client"

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - in a real app this would come from an API
const generateChartData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      students: Math.floor(Math.random() * 20) + 10,
      revenue: Math.floor(Math.random() * 500) + 100,
      completions: Math.floor(Math.random() * 8) + 1,
    });
  }

  return data;
};

export default function DashboardChart() {
  const [timeRange, setTimeRange] = useState("30");
  const [chartData, setChartData] = useState(generateChartData(30));
  const [chartType, setChartType] = useState("students");

  const handleRangeChange = (value: string) => {
    setTimeRange(value);
    setChartData(generateChartData(parseInt(value)));
  };

  const getChartConfig = () => {
    switch (chartType) {
      case "revenue":
        return {
          dataKey: "revenue",
          name: "Revenue",
          stroke: "hsl(var(--chart-1))",
          fill: "hsl(var(--chart-1))",
          formatter: (value: number) => `$${value}`,
        };
      case "completions":
        return {
          dataKey: "completions",
          name: "Course Completions",
          stroke: "hsl(var(--chart-2))",
          fill: "hsl(var(--chart-2))",
          formatter: (value: number) => String(value),
        };
      default:
        return {
          dataKey: "students",
          name: "Active Students",
          stroke: "hsl(var(--chart-3))",
          fill: "hsl(var(--chart-3))",
          formatter: (value: number) => String(value),
        };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === "students" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("students")}
          >
            Students
          </Button>
          <Button
            variant={chartType === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant={chartType === "completions" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("completions")}
          >
            Completions
          </Button>
        </div>
        <Select value={timeRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
              tickFormatter={chartConfig.formatter}
            />
            <Tooltip
              formatter={chartConfig.formatter}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={chartConfig.dataKey}
              name={chartConfig.name}
              stroke={chartConfig.stroke}
              fill={chartConfig.fill}
              fillOpacity={0.2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}