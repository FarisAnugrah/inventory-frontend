"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function barangKeluar() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama Barang", accessor: "barang" },
    { header: "Nama Gudang", accessor: "gudang" },
    { header: "Nama User", accessor: "user" },
    { header: "Jumlah", accessor: "jumlah" },
    { header: "Tanggal Keluar", accessor: "tanggal" },
    { header: "Status", accessor: "status" },
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

        const data = await response.json();

        setBarangKeluar(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBarangKeluar();
  }, [token, initialized]);

  console.log(barangKeluar);

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={barangKeluar}
        showAddButton={user?.role === "staff"}
        showAddMutasi={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={true}
        showControls={true}
        showActions={false}
        showDetailsOnly={false}
      />
    </div>
  );
}
