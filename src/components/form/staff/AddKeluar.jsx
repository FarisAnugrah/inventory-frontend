"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function TambahKeluarPage() {
  const router = useRouter();

  const { token, initialized } = useAuth(); // Assuming you have a useAuth hook to get the token
  const [selectedBarangDetail, setSelectedBarangDetail] = useState(null);
  const [barangList, setBarangList] = useState([]);
  const [jumlah, setJumlah] = useState("");
  const [tujuanPengeluaran, setTujuanPengeluaran] = useState("");
  const [searchNamaBarang, setSearchNamaBarang] = useState("");

  useEffect(() => {
    if (!initialized || !token) return;
    const fetchBarangList = async () => {
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

        if (!response.ok) {
          throw new Error("Failed to fetch barang list");
        }

        const { data } = await response.json();
        setBarangList(data);
      } catch (error) {
        console.error("Error fetching barang list:", error);
      }
    };

    fetchBarangList();
  }, [token, initialized]);

  const handleSearchBarangChange = (e) => {
    const value = e.target.value;
    setSearchNamaBarang(value);

    const found = barangList?.data.find(
      (barang) => barang.nama_barang.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      setSelectedBarangDetail(found);
    } else {
      setSelectedBarangDetail(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBarangDetail) {
      toast.error("Please select a valid barang");
      return;
    }

    const data = {
      barang_id: selectedBarangDetail.id,
      jumlah: parseInt(jumlah, 10),
      gudang_id: selectedBarangDetail.gudang_id || "1", // Assuming default Gudang A
      tujuan_pengeluaran: tujuanPengeluaran,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/barang-keluar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add barang keluar");
      }

      toast.success("Barang keluar added successfully");
      router.push("/barangKeluar"); // Redirect to barang keluar page
    } catch (error) {
      console.error("Error adding barang keluar:", error);
      toast.error(error.message || "Failed to add barang keluar");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Detail Barang Keluar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="search_nama_barang"
          placeholder="Nama Barang"
          onChange={handleSearchBarangChange}
          value={searchNamaBarang}
          className="input input-bordered w-full"
          list="barang"
          required
        />
        {/* Selected detail barang should be right here when there's an item selected */}
        {selectedBarangDetail && (
          <div className="p-4 bg-gray-100 rounded-md space-y-2">
            <p>
              <strong>Nama:</strong> {selectedBarangDetail.nama_barang}
            </p>
            <p>
              <strong>Kategori:</strong>{" "}
              {selectedBarangDetail.kategori?.nama_kategori}
            </p>
            <p>
              <strong>Gudang:</strong>{" "}
              {selectedBarangDetail.nama_gudang || "Gudang A"}
            </p>
            <p>
              <strong>Stok Keseluruhan:</strong>{" "}
              {selectedBarangDetail.stok_keseluruhan}
            </p>
            <p>
              <strong>Satuan:</strong> {selectedBarangDetail.satuan}
            </p>
            {/* You can also show stok, gudang, etc */}
          </div>
        )}
        <datalist id="barang" className="w-full">
          {barangList?.data?.map((barang, index) => (
            <option key={index} value={barang.nama_barang}>
              {barang.kode_barang} - ({barang.stok_keseluruhan}
              {barang.satuan})
            </option>
          ))}
        </datalist>

        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          className="input input-bordered w-full"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
        />
        <input
          type="text"
          name="gudang_id"
          placeholder="Gudang"
          className="input input-bordered w-full"
          value={"Gudang A"}
          disabled
        />
        <input
          type="text"
          name="tujuan_pengeluaran"
          placeholder="Tujuan Pengeluaran"
          className="input input-bordered w-full"
          value={tujuanPengeluaran}
          onChange={(e) => setTujuanPengeluaran(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
