"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TambahMasukPage({ incomingItem = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori_id: null,
    satuan: "",
    jumlah: "",
    gudang_id: 1,
    stok_keseluruhan: "",
  });

  const [categories, setCategories] = useState([]);
  const { token, initialized } = useAuth();
  const [isLoading, SetIsLoading] = useState(true);
  useEffect(() => {
    if (!token || !initialized) return;
    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/kategori`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const results = await response.json();
        setCategories(results);
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();

    if (incomingItem) {
      setFormData({
        nama_barang: incomingItem?.barang.nama_barang || "",
        kategori_id: incomingItem?.barang?.kategori.kategori_id || null,
        satuan: incomingItem?.barang.satuan || "",
        jumlah: incomingItem.jumlah || "",
        gudang_id: 1,
        stok_keseluruhan: incomingItem?.barang.stok_keseluruhan || "",
      });
    }

    SetIsLoading(false);
  }, [token, initialized, incomingItem, isLoading]);

  console.log(incomingItem);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/barang-masuk${
          incomingItem ? `/${incomingItem.id}` : ""
        }`,
        {
          method: incomingItem ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      router.push("/barangMasuk"); // redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Detail Barang Masuk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama_barang"
          placeholder="Nama Barang"
          className="input input-bordered w-full"
          value={formData.nama_barang || ""}
          onChange={handleChange}
          required
        />
        <fieldset className="fieldset">
          <select
            onChange={handleChange}
            name="kategori_id"
            value={formData.kategori_id ?? ""}
            className="select w-full"
            required
            disabled={isLoading}
          >
            <option disabled={true}>Pilih Kategori</option>;
            {categories?.map((category, key) => {
              return (
                <option value={category.id} key={key}>
                  {category.nama_kategori}
                </option>
              );
            })}
          </select>
        </fieldset>
        <input
          type="text"
          name="gudang"
          className="input input-bordered w-full"
          value={"Gudang A"}
          disabled
        />
        <input
          type="text"
          name="satuan"
          placeholder="Satuan"
          className="input input-bordered w-full"
          value={formData.satuan}
          onChange={handleChange}
        />

        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          className="input input-bordered w-full"
          value={formData.jumlah}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stok_keseluruhan"
          placeholder="Stok Keseluruhan"
          className="input input-bordered w-full"
          value={formData.stok_keseluruhan}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
