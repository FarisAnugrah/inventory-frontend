"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import DetailModal from "@/components/DetailModal";

export default function MenyetujuiBarang() {
  const [selectedItem, setSelectedItem] = useState(null);
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
        toast.error(error.meta.message || "Gagal mengambil data barang keluar");
      }
    };
    getBarangKeluar();
  }, [token, initialized, selectedItem]);

  const userFormatter = (row) => {
    return row?.user?.name || "Tidak Tersedia";
  };

  const barangFormatter = (row) => {
    return row?.barang?.nama_barang || "Tidak Tersedia";
  };

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama User", accessor: "user?.name", formatter: userFormatter },
    {
      header: "Nama Barang",
      accessor: "barang?.nama_barang",
      formatter: barangFormatter,
    },
    { header: "Jumlah Barang Keluar", accessor: "jumlah" },
    { header: "Tanggal Keluar", accessor: "tanggal_keluar" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={barangKeluar?.data || []}
        showAddButton={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        showDetailsOnly={true}
        showAddMutasi={false}
        onDetailClick={(item) => setSelectedItem(item)}
      />
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          token={token}
        />
      )}
    </div>
  );
}
