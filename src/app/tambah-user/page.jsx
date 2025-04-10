'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: simpan data ke backend
    console.log('Submitted:', formData);
    router.push('/user'); // redirect ke halaman user
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered w-full"
            value={formData.password}
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
            <option value="staff">staff</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
