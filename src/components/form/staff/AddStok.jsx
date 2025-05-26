'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahStok() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    jumlah: '',
    gudang: '',
    satuan: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.nama]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    router.push('/stok/staff'); // redirect
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tambah Stok</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="kode"
          placeholder="Kode Barang"
          className="input input-bordered w-full"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama Barang"
          className="input input-bordered w-full"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jumlah"
          placeholder="Jumlah Barang"
          className="input input-bordered w-full"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <select
        name="role"
        className="select select-bordered w-full"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="a">Gudang A</option>
      </select>
        <input
          type="text"
          name="satuan"
          placeholder="Satuan"
          className="input input-bordered w-full"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Simpan
        </button>
      </form>
    </div>
  );
}
