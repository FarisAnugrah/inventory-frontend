"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AddUser({ user = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const { token } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = user
      ? { ...formData, ...(formData.password ? {} : { password: undefined }) }
      : formData;

    const response = await fetch(
      `http://localhost:8000/api/users${user ? `/${user.id}` : ""}`,
      {
        method: user ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    router.push("/pengelola-pengguna");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {!!user ? "Update" : "Tambah"} User
      </h1>
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
          required={!user}
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
          <option value="manajer">Manager</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
