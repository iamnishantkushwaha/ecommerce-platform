import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({stats}) => {

    const chartData = stats
    ? stats
    : [];
    
  return (
    <div className="w-full h-80 bg-white p-5 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
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
          dataKey="revenue"
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};


export default RevenueChart;