import { useNotification } from "@/context/NotificationContext";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function DetailModal({ item, onClose, token }) {
  const { refresh } = useNotification();

  const handleAprrove = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/barang-keluar/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Assuming item contains the token
          },
          body: JSON.stringify({
            status: value,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error?.meta?.message || "Gagal mengubah status barang keluar"
        );
      }
      const data = await response.json();
      toast.success(
        `${item?.barang?.nama_barang} berhasil ${
          value === "approved" ? "disetujui" : "ditolak"
        }`
      );
      onClose();
      refresh();
    } catch (error) {
      toast.error(error?.message || "Gagal mengubah status barang keluar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white  w-[500px] shadow-lg rounded-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Detail Barang Keluar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 text-sm">
          <div className="flex">
            <div className="w-40 font-medium">Nama User</div>
            <div>: {item.user.name}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Kode Keluar</div>
            <div>: {item.kode_keluar}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Nama Barang</div>
            <div>: {item.barang.nama_barang}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Jumlah Barang Keluar</div>
            <div>: {item.jumlah}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Tanggal Keluar</div>
            <div>: {item.tanggal_keluar}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Status</div>
            <div>: {item.status}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={() => handleAprrove("rejected")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Tolak
          </button>
          <button
            onClick={() => handleAprrove("approved")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Setuju
          </button>
        </div>
      </div>
    </div>
  );
}
