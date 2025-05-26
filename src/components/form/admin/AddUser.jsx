'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    router.push('/pengelola-pengguna'); // redirect
  };

  return (
    <div>
    <h1 className="text-xl font-bold mb-4">Tambah User</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={handleChange}
        required
        />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={formData.email}
        onChange={handleChange}
        required
        />
      <input
        type="password"
        name="password"
        placeholder="Password"
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
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
      </select>
      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
    </div>
  );
}
