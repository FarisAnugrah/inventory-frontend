"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function pengelola() {
  const columns = [
    { header: "No", accessor: "id" },
    { header: "Kategori Barang", accessor: "nama_kategori" },
  ];

  const [categories, setCategories] = useState([]);
  const { token, initialized } = useAuth();

  useEffect(() => {
    if (!token || !initialized) return;

    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/kategori`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const results = await response.json();
        setCategories(results || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getCategories();
  }, [token, initialized]);

  if (!initialized) return <p>loading...</p>;

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={categories}
        showSearch={false}
        showAddButton={true}
        showAddMutasi={false}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        addLink="/tambah-item"
        editLink="/edit-item"
        token={token}
        endpoint={"kategori"}
      />
    </div>
  );
}
