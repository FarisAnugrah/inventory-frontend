"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TambahKategori({ item = null }) {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    if (item) {
      setCategory(item.nama_kategori);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_APP_BASEURL}/api/kategori${
        item ? `/${item.id}` : ""
      }`,
      {
        method: item ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          nama_kategori: category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response?.status);
    }

    router.push("/pengelola-kategori"); // redirect
  };

  console.log(item);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tambah Kategori</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="kategori"
          placeholder="Kategori Barang"
          className="input input-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Simpan
        </button>
      </form>
    </div>
  );
}
