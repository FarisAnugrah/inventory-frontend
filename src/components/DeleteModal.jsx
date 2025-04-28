'use client';

export default function DeleteModal({ isOpen, onClose, item, onDelete, itemLabel = 'data ini' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
                <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
                <p>Apakah kamu yakin ingin menghapus <strong>{item?.name || itemLabel}</strong>?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={onClose} className="btn">Batal</button>
                    <button onClick={() => { onDelete(item); }} className="btn btn-error text-white">Hapus</button>
                </div>
            </div>
        </div>
    );
}