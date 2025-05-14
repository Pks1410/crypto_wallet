import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "ETH", value: 60 },
  { name: "BTC", value: 30 },
  { name: "USDT", value: 10 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const PortfolioChart = () => (
  <PieChart width={300} height={300}>
    <Pie
      data={data}
      cx={150}
      cy={150}
      labelLine={false}
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default PortfolioChart;
