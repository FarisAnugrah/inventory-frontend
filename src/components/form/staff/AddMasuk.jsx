'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahMasukPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    barang: '',
    supplier: '',
    stok: '',
    tanggal: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    router.push('/barangMasuk/staff'); // redirect
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Detail Barang Masuk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="user"
          placeholder="Nama User"
          className="input input-bordered w-full"
          value={formData.user}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="barang"
          placeholder="Nama Barang"
          className="input input-bordered w-full"
          value={formData.barang}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="supplier"
          placeholder="Nama Supplier"
          className="input input-bordered w-full"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stok"
          placeholder="Stok Masuk"
          className="input input-bordered w-full"
          value={formData.stok}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="tanggal"
          className="input input-bordered w-full"
          value={formData.tanggal}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
