'use client';

import { useState } from 'react';

export default function AddMutasi({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    gudangAsal: '',
    gudangTujuan: '',
    tanggal: '',
    barang: '',
    penanggungJawab: '',
    jumlah: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    router.push('/mutasiBarang'); // redirect
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-6">Form Mutasi Barang</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Gudang Asal :</label>
            <select name="gudangAsal" onChange={handleChange} className="input input-bordered w-full">
              <option value="">Pilih</option>
              <option value="pusat">Gudang Pusat</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Gudang Tujuan :</label>
            <select name="gudangTujuan" onChange={handleChange} className="input input-bordered w-full">
              <option value="">Pilih</option>
              <option value="surabaya">Gudang Cabang Surabaya</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Detail Barang :</label>
            <select name="barang" onChange={handleChange} className="input input-bordered w-full">
              <option value="">Cari / Pilih Barang</option>
              <option value="barang1">Barang A</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Penanggung Jawab :</label>
            <input type="text" name="penanggungJawab" onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tanggal Mutasi :</label>
            <input type="date" name="tanggal" onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Jumlah :</label>
            <input type="number" name="jumlah" onChange={handleChange} className="input input-bordered w-full" />
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="btn btn-neutral">Batal</button>
            <button type="submit" className="btn btn-success">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
