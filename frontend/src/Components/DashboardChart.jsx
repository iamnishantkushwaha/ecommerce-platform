import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

import React from "react";

const DashboardChart = ({ stats }) => {
  const chartData = stats
    ? stats
    : [];
  return (
    <ResponsiveContainer className="h-full w-full ">
      <BarChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="month"
          tick={{ fill: "#6b7280", fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        />
        <Bar
          fill="#4f46e5"
          radius={[10, 10, 0, 0]}
          barSize={100}
          dataKey="sales"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;

