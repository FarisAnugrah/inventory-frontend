"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import the pie chart with SSR disabled
const ClientPieChart = dynamic(() => import("@/components/ClientPieChart"), {
  ssr: false,
});

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cards = [
    { title: "Jumlah Barang Masuk", count: 12 },
    { title: "Jumlah Barang Keluar", count: 7 },
    { title: "Jumlah Supplier", count: 5 },
  ];
  const dataLine = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 72 },
    { name: "Sat", value: 80 },
  ];

  const dataPie = [
    { name: "Makanan", value: 41.1 },
    { name: "Minuman", value: 99 },
    { name: "Elektronik", value: 73.1 },
    { name: "AAT", value: 34.6 },
    { name: "Sembako", value: 98.84 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card, i) => (
          <div key={i} className="card bg-base-100 shadow-md p-6 text-center">
            <p className="text-lg font-semibold">{card.title}</p>
            <p className="text-4xl mt-2 text-primary">{card.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Barang Masuk - Only render on client */}
        {isMounted && (
          <div className="card bg-base-100 shadow-md p-4">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Barang Masuk</h2>
              <LineChart width={280} height={200} data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
          </div>
        )}

        {/* Barang Keluar - Only render on client */}
        {isMounted && (
          <div className="card bg-base-100 shadow-md p-4">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Barang Keluar</h2>
              <LineChart width={280} height={200} data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
          </div>
        )}

        {/* PieChart - Only render on client */}
        {isMounted && <ClientPieChart dataPie={dataPie} />}
      </div>
    </div>
  );
}

// Import these normally (they'll be tree-shaken in SSR)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
