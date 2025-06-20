"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function barangMasuk() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode Masuk", accessor: "kode_masuk" },
    { header: "Nama Barang", accessor: "nama_barang" },
    { header: "Kategori", accessor: "kategori" },
    { header: "Gudang", accessor: "gudang" },
    { header: "Satuan", accessor: "satuan" },
    { header: "Stok Masuk", accessor: "stok_masuk" },
    { header: "Tanggal Masuk", accessor: "tanggal_masuk" },
  ];

  const { user, token, initialized } = useAuth();
  const [barangMasuk, setBarangMasuk] = useState([]);

  useEffect(() => {
    if (!token || !initialized) return;

    const getBarangMasuk = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/barang-masuk`,
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

        setBarangMasuk(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBarangMasuk();
  }, [token, initialized]);

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={barangMasuk}
        showAddButton={user?.role === "staff"}
        showAddMutasi={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={true}
        showControls={true}
        showDetailsOnly={false}
        showActions={user?.role === "staff"}
        addLink={"/tambah-masuk"}
        editLink={`/tambah-masuk`}
        token={token}
        endpoint={"barang-masuk"}
      />
    </div>
  );
}
