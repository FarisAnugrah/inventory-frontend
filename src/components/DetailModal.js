import { X } from "lucide-react"; // Pastikan kamu install lucide-react: npm install lucide-react

export default function DetailModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md w-[500px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Detail Barang Keluar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 text-sm">
          <div className="flex">
            <div className="w-40 font-medium">Nama User</div>
            <div>: {item.user}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Kode Keluar</div>
            <div>: {item.kode}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Nama Barang</div>
            <div>: {item.nama}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Nama Supplier</div>
            <div>: {item.supplier}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Stok Keluar</div>
            <div>: {item.stok}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Tanggal Keluar</div>
            <div>: {item.tanggal}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={() => alert("Ditolak")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tolak
          </button>
          <button
            onClick={() => alert("Disetujui")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Setuju
          </button>
        </div>
      </div>
    </div>
  );
}
