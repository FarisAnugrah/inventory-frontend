"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { set } from "date-fns";

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);
  const { token, initialized } = useAuth();
  useEffect(() => {
    if (!initialized || !token) return;

    const fetchNotifikasi = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/notifikasi?tampilkan=semua`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const results = await response.json();
        setNotifikasi(results?.data || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifikasi();
  }, [token, initialized, selectedNotifikasi]);

  const shortMonthDateFormat = (date) => {
    const options = { month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("id-ID", options);
    return formattedDate;
  };

  const handleSelectNotifikasi = (item) => {
    const date = new Date(item.created_at);
    const formattedDate = shortMonthDateFormat(date);
    const namaBarangMatch = item?.pesan.match(/barang '([^']+)'/);
    const kodeBarangMatch = item?.pesan.match(/\(Kode: ([^)]+)\)/);
    const stokMatch = item?.pesan.match(/Sisa stok: (\d+)\s+(\w+)/);

    const nama_barang = namaBarangMatch ? namaBarangMatch[1] : null;
    const kode_barang = kodeBarangMatch ? kodeBarangMatch[1] : null;
    const stok_keseluruhan = stokMatch ? parseInt(stokMatch[1]) : null;
    const satuan = stokMatch ? stokMatch[2] : null;
    setSelectedNotifikasi({
      item,
      tanggal: formattedDate,
      barang: {
        nama_barang,
        kode_barang,
        stok_keseluruhan,
        satuan,
      },
    });
    const modal = document.getElementById("notification_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const handleCloseModal = async (id) => {
    try {
      const modal = document.getElementById("notification_modal");
      const response = await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/notifikasi/${id}/baca`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
      const results = await response.json();
      modal.close();
      setSelectedNotifikasi(null);
    } catch (error) {
      console.error("Failed to close modal:", error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-3 p-4">
        <ul className=" bg-base-100 rounded-box flex flex-col gap-5">
          {notifikasi.map((item, index) => {
            const date = new Date(item.created_at);
            const formattedDate = shortMonthDateFormat(date);
            return (
              <li
                key={index}
                onClick={() => handleSelectNotifikasi(item)}
                className={`${
                  item.dibaca_pada && "bg-gray-200"
                } list-row flex justify-between items-center p-6 hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer rounded-box shadow-xl`}
              >
                <div className="left-side-wrapper flex gap-3 ">
                  <div>
                    <div
                      className={`badge badge-error badge-xs rounded-full ${
                        item.dibaca_pada && "hidden"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div>{item.judul}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {item.pesan}
                    </div>
                  </div>
                </div>
                <span className=" text-gray-300 text-sm">{formattedDate}</span>
              </li>
            );
          })}
        </ul>

        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="notification_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => handleCloseModal(selectedNotifikasi?.item.id)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <div className="flex items-center justify-center">
              <div>
                <h2 className="text-center text-2xl font-semibold text-gray-700">
                  {selectedNotifikasi?.item.judul}
                </h2>
                <p className="text-center text-sm text-gray-500 mb-4">
                  {selectedNotifikasi?.item.pesan}
                </p>

                <div className="flex justify-center mb-4">
                  <img
                    src="/assets/images/notif.png"
                    alt="Low Stock Icon"
                    className="w-24 h-24"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2 text-black-500 font-medium">
                    <span className="mr-2"></span> Detail Notifikasi Stok Rendah
                  </div>

                  <div className=" border-t border-gray-200 pt-4 text-sm space-y-4 text-gray-700">
                    <div className="flex justify-between">
                      <span>Nama Barang</span>
                      <span>: {selectedNotifikasi?.barang.nama_barang}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sisa Stok</span>
                      <span>
                        : {selectedNotifikasi?.barang.stok_keseluruhan} Karton
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-center font-semibold text-black-600">
                    Segera lakukan restok sebelum stok habis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Notifikasi;
