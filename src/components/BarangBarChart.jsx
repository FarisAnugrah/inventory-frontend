"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getDaysInMonth(year, month) {
  // month: 0-based (0=Jan, 5=Jun)
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
}

export default function BarangBarChart({ barangMasuk, barangKeluar }) {
  // Ambil bulan & tahun sekarang
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  // Buat label tanggal: 1, 2, ..., 30/31
  const days = getDaysInMonth(year, month);

  // Helper: ambil jumlah barang masuk/keluar per tanggal di bulan ini
  const masukCounts = days.map((day) => {
    const tanggalStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return barangMasuk?.filter((item) => item.tanggal?.startsWith(tanggalStr))?.length || 0;
  });
  const keluarCounts = days.map((day) => {
    const tanggalStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return barangKeluar?.filter((item) => item.tanggal_keluar?.startsWith(tanggalStr))?.length || 0;
  });

  const data = {
    labels: days.map((d) => d.toString()),
    datasets: [
      {
        label: "Barang Masuk",
        data: masukCounts,
        backgroundColor: "#4E71FF",
      },
      {
        label: "Barang Keluar",
        data: keluarCounts,
        backgroundColor: "#8DD8FF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Barang Masuk & Keluar Bulan ${month + 1} ${year}` },
    },
  };

  return <Bar data={data} options={options} />;
}
