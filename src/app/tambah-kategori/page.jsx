'use client';
import { useState } from 'react';
import EditModalTemplate from '@/components/modals/EditModalTemplate';
import DeleteModalTemplate from '@/components/modals/DeleteModalTemplate';

const dummyKategori = [
  { id: 1, nama: 'Elektronik', kode: 'ELK001' },
  { id: 2, nama: 'Alat Tulis', kode: 'ALT002' }
];

export default function KategoriBarangPage() {
  const [kategori, setKategori] = useState(dummyKategori);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null);

  const handleSave = (updatedItem) => {
    setKategori(kategori.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDelete = (itemToDelete) => {
    setKategori(kategori.filter(item => item.id !== itemToDelete.id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kategori Barang</h1>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nama Kategori</th>
            <th className="p-2">Kode</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kategori.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.nama}</td>
              <td className="p-2">{item.kode}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    setSelectedKategori(item);
                    setShowEdit(true);
                  }}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedKategori(item);
                    setShowDelete(true);
                  }}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      <EditModalTemplate
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedKategori}
        onSave={handleSave}
        fields={[
          { name: 'nama', placeholder: 'Nama Kategori' },
          { name: 'kode', placeholder: 'Kode Kategori' }
        ]}
      />

      {/* Modal Delete */}
      <DeleteModalTemplate
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        data={selectedKategori}
        onDelete={handleDelete}
      />
    </div>
  );
}
