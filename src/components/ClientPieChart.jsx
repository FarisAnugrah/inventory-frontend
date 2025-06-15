"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#6366f1"];

export default function ClientPieChart({ dataPie }) {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Kategori Barang</h2>
        <PieChart width={300} height={250}>
          <Pie
            data={dataPie}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataPie?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
