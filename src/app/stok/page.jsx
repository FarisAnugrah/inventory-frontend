"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function stok() {
  const { user, token, initialized } = useAuth();
  const [barang, setBarang] = useState([]);
  const gudangFormatter = (row) => {
    return row?.gudang?.nama_gudang || "Tidak Tersedia";
  };
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode Barang", accessor: "kode_barang" },
    { header: "Nama Barang", accessor: "nama_barang" },
    { header: "Jumlah Barang", accessor: "stok_keseluruhan" },
    {
      header: "Gudang",
      accessor: "gudang?.nama_gudang",

      formatter: gudangFormatter,
    },
    { header: "Satuan", accessor: "satuan" },
  ];

  useEffect(() => {
    if (!token || !initialized) return;

    const getBarang = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/barang`,
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

        setBarang(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBarang();
  }, [token, initialized]);

  console.log("Barang data:", barang);
  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={barang?.data}
        showAddButton={user?.role === "staff"}
        showAddMutasi={false}
        showSearch={false}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        showActions={true}
        showDetailsOnly={false}
        addLink="/tambah-stok"
      />
    </div>
  );
}
