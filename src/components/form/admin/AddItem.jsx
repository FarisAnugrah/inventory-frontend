'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahKategori() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    jenis: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.nama]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    router.push('/pengelola-kategori'); // redirect
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tambah Kategori</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama Barang"
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
        <option value="makanan">Makanan</option>
        <option value="minuman">Minuman</option>
        <option value="elektronik">Elektronik</option>
      </select>
        <button type="submit" className="btn btn-primary w-full">
          Simpan
        </button>
      </form>
    </div>
  );
}
