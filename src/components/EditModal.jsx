'use client';

import { useState, useEffect } from 'react';

export default function EditModal({ isOpen, onClose, user, onSave }) {
    const [formData, setFormData] = useState({ name: '', email: '', role: 'staff' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'staff',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Edit User</h2>
                <input
                    className="input input-bordered w-full mb-2"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    className="input input-bordered w-full mb-2"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <select
                    className="select select-bordered w-full mb-4"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="btn">Batal</button>
                    <button onClick={handleSubmit} className="btn btn-primary">Simpan</button>
                </div>
            </div>
        </div>
    );
}
