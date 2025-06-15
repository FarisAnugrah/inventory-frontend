"use client";

import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import the pie chart with SSR disabled
const ClientPieChart = dynamic(() => import("@/components/ClientPieChart"), {
  ssr: false,
});

export default function Dashboard() {
  const [data, setData] = useState({
    barang: null,
    barangMasuk: null,
    barangKeluar: null,
    kategori: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { token, initialized } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    if (!initialized || !token) return;

    const fetchData = async () => {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          fetch(`${process.env.NEXT_APP_BASEURL}/api/barang`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_APP_BASEURL}/api/barang-masuk`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_APP_BASEURL}/api/barang-keluar`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_APP_BASEURL}/api/kategori`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Convert all responses to JSON
        const [barang, barangMasuk, barangKeluar, kategori] = await Promise.all(
          [
            response1.json(),
            response2.json(),
            response3.json(),
            response4.json(),
          ]
        );

        setData({ barang, barangMasuk, barangKeluar, kategori });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, initialized]);

  const { barang, barangMasuk, barangKeluar, kategori } = data;

  const cards = [
    { title: "Jumlah Stok Barang", count: barang?.data?.data?.length || 0 },
    {
      title: "Jumlah Barang Masuk",
      count: barangMasuk?.data?.length || 0,
    },
    {
      title: "Jumlah Barang Keluar",
      count: barangKeluar?.length || 0,
    },
  ];
  const dataLine = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 72 },
    { name: "Sat", value: 80 },
  ];

  console.log(barang);

  const dataPie = barang?.data?.data?.reduce((acc, item) => {
    const category = item?.kategori?.nama_kategori || "Uncategorized";
    const value = item?.stok_keseluruhan || 0;

    const existing = acc.find((entry) => entry.name === category);

    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name: category, value });
    }

    return acc;
  }, []);
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
