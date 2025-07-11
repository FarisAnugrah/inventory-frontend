"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function barangKeluar() {
  const gudangFormatter = (row) => {
    return row?.gudang?.nama_gudang || "Tidak Tersedia";
  };

  const barangFormatter = (row) => {
    return row?.barang?.nama_barang || "Tidak Tersedia";
  };
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode Keluar", accessor: "kode_keluar" },
    {
      header: "Nama Barang",
      accessor: "barang?.nama_barang",
      formatter: barangFormatter,
    },

    {
      header: "Nama Gudang",
      accessor: "gudang?.nama_gudang",
      formatter: gudangFormatter,
    },
    { header: "Jumlah", accessor: "jumlah" },
    { header: "Tanggal Keluar", accessor: "tanggal_keluar" },
    { header: "Tujuan Pengeluaran", accessor: "tujuan_pengeluaran" },
  ];
  const { user, token, initialized } = useAuth();
  const [barangKeluar, setBarangKeluar] = useState([]);

  useEffect(() => {
    if (!token || !initialized) return;

    const getBarangKeluar = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/barang-keluar`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const { data } = await response.json();

        setBarangKeluar(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBarangKeluar();
  }, [token, initialized]);

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={barangKeluar?.data || []}
        showAddButton={user?.role === "staff"}
        showAddMutasi={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={true}
        showControls={true}
        showDetailsOnly={false}
        addLink="/tambah-keluar"
        editLink="/edit-keluar"
        token={token}
        showActions={false}
      />
    </div>
  );
}
