'use client';
import { useState } from 'react';

export default function AddModal({ isOpen, onClose, fields, onAdd }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Tambah Data</h2>
                {fields.map((field) => (
                    field.type === 'select' ? (
                        <select
                            key={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="select select-bordered w-full mb-2"
                        >
                            {field.options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            key={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="input input-bordered w-full mb-2"
                        />
                    )
                ))}
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="btn">Batal</button>
                    <button onClick={handleSubmit} className="btn btn-success">Tambah</button>
                </div>
            </div>
        </div>
    );
}
