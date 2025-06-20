"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { set } from "date-fns";
import { useNotification } from "@/context/NotificationContext";

export default function TambahMasukPage({ incomingItem = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori_id: 1,
    satuan: "PCS",
    jumlah: "",
    gudang_id: 1,
  });

  const [categories, setCategories] = useState([]);
  const [barangList, setBarangList] = useState([]);
  const [searchNamaBarang, setSearchNamaBarang] = useState("");
  const [selectedBarangDetail, setSelectedBarangDetail] = useState(null);
  const [updateJumlah, setUpdateJumlah] = useState("");
  const [satuanList, setSatuanList] = useState([]);

  const { token, initialized } = useAuth();
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    if (!token || !initialized) return;

    const fetchData = async () => {
      try {
        const [kategoriRes, barangRes, satuanRes] = await Promise.all([
          fetch(`${process.env.NEXT_APP_BASEURL}/api/kategori`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
          fetch(`${process.env.NEXT_APP_BASEURL}/api/barang`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
          fetch("/assets/data/satuan.json", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
        ]);

        if (!kategoriRes.ok || !barangRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [kategoriData, barangData, satuanData] = await Promise.all([
          kategoriRes.json(),
          barangRes.json(),
          satuanRes.json(),
        ]);

        setCategories(kategoriData);
        setBarangList(barangData);
        setSatuanList(satuanData);
      } catch (err) {
        console.error("Error fetching kategori or barang:", err);
      }

      if (incomingItem) {
        setFormData({
          nama_barang: incomingItem?.barang.nama_barang || "",
          kategori_id: incomingItem?.barang?.kategori?.id || null,
          satuan: incomingItem?.barang.satuan || "",
          jumlah: incomingItem.jumlah || "",
          gudang_id: 1,
        });
      }

      SetIsLoading(false);
    };

    fetchData();
  }, [token, initialized, incomingItem, isLoading]);

  console.log("Form Data:", formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchBarangChange = (e) => {
    const value = e.target.value;
    setSearchNamaBarang(value);

    const found = barangList?.data?.data.find(
      (barang) => barang.nama_barang.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      setSelectedBarangDetail(found);
    } else {
      setSelectedBarangDetail(null);
    }
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

  const handleExistingBarangSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBarangDetail) {
      alert("Please select a valid barang from the list.");
      return;
    }
    const data = {
      barang_id: selectedBarangDetail.id,
      gudang_id: 1, // Assuming you want to use Gudang A
      jumlah: updateJumlah,
    };
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
          body: JSON.stringify(data),
        }
      );

      router.push("/barangMasuk"); // redirect
    } catch (err) {
      console.error(err);
    }

    setUpdateJumlah(0); // Reset the jumlah input after submission
    setSearchNamaBarang(""); // Clear the search input
    setSelectedBarangDetail(null); // Clear the selected barang detail
  };

  if (isLoading || !initialized || !token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className=" loading-ball"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="tabs tabs-lift ">
        {incomingItem && (
          <h1 className="mb-4 text-2xl font-semibold">Edit Barang Masuk</h1>
        )}
        <input
          type="radio"
          name="my_tabs_3"
          className={`tab w-1/2 ${incomingItem ? "hidden" : ""}`}
          aria-label="Tambah Barang Masuk Baru"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 ">
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
                  value={formData.kategori_id}
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
              <fieldset className="fieldset">
                <select
                  name="satuan"
                  className="select w-full"
                  value={formData.satuan}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                >
                  {satuanList?.satuan?.map((satuan, key) => {
                    return (
                      <option value={satuan.kode} key={key}>
                        {satuan.nama} - {`(${satuan.kode})`}
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

              {!incomingItem && (
                <input
                  type="number"
                  name="jumlah"
                  placeholder="Jumlah"
                  className="input input-bordered w-full"
                  value={formData.jumlah}
                  onChange={handleChange}
                  required
                />
              )}
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className={`tab w-1/2 ${incomingItem && "hidden"} `}
          aria-label="Tambah Barang Masuk Yang Sudah Ada"
        />
        <div className={`tab-content bg-base-100 border-base-300 p-6`}>
          <form onSubmit={handleExistingBarangSubmit} className="space-y-4">
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
              {barangList?.data?.data.map((barang, index) => (
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
              value={updateJumlah}
              onChange={(e) => setUpdateJumlah(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
