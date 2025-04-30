'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function CustomTable(param) {
    const {
        columns = [],
        data = [],
        showAddButton = true,
        showControls = true,
        showWeekFilter = true,
        showPagination = true,
        showSearch = true,
        showActions = true,
        entriesOptions = [5, 10, 20],
    } = param;

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(entriesOptions[0]); // FIX: defaultEntries undefined → pakai default dari entriesOptions
    const [page, setPage] = useState(1);
    const [selectedWeek, setSelectedWeek] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAdd = () => router.push('/tambah-user');
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };
    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const isDateInWeek = (dateStr, weekStr) => {
        const date = new Date(dateStr);
        const inputWeek = new Date(`${weekStr}-1`);
        const endOfWeek = new Date(inputWeek);
        endOfWeek.setDate(inputWeek.getDate() + 6);
        return date >= inputWeek && date <= endOfWeek;
    };

    const filteredData = data.filter(row => {
        const matchesSearch = Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesWeek = selectedWeek ? isDateInWeek(row.tanggal, selectedWeek) : true;
        return matchesSearch && matchesWeek;
    });

    const totalPages = Math.ceil(filteredData.length / entries);
    const startIndex = (page - 1) * entries;
    const displayedData = filteredData.slice(startIndex, startIndex + entries);

    return (
        <div className="w-full">
            {showControls && (
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    {showAddButton && (
                        <button onClick={handleAdd} className="btn btn-primary">Tambah</button>
                    )}
                    {showWeekFilter && (
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold">Filter Minggu</label>
                            <input
                                type="week"
                                className="input input-bordered input-sm"
                                value={selectedWeek}
                                onChange={e => {
                                    setSelectedWeek(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>
                    )}
                    {showSearch && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Search:</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                value={searchTerm}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Cari data..."
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Show</span>
                        <select
                            className="select select-bordered select-sm"
                            value={entries}
                            onChange={e => {
                                setEntries(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            {entriesOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <span className="text-sm">entries</span>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table w-full text-black border border-gray-200">
                    <thead className="bg-blue-200 text-black border-b border-gray-200">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="py-2 px-4 border-r border-gray-200">
                                {col.header}
                            </th>
                        ))}
                        {showActions && (
                            <th className="py-2 px-4 border-r border-gray-200">Action</th>
                        )}
                    </tr>
                </thead>
                    <tbody className="bg-white">
                        {displayedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="py-2 px-4 border-t border-r border-gray-200">
                                        {col.accessor === 'no'
                                            ? startIndex + rowIndex + 1
                                            : row[col.accessor]}
                                    </td>
                                ))}
                                <td className="py-2 px-4 border-t border-r border-gray-200">
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-sm text-white bg-red-500"
                                            onClick={() => handleEdit(row)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm text-black bg-blue-300"
                                            onClick={() => handleDelete(row)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPagination && (
                <div className="flex justify-between items-center mt-4 text-sm">
                    <p>
                        Showing {startIndex + 1} to {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
                    </p>
                    <div className="join">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="join-item btn btn-sm"
                        >
                            Previous
                        </button>
                        <button className="join-item btn btn-sm btn-primary">{page}</button>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="join-item btn btn-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL */}
            <EditModal isOpen={showEdit} onClose={() => setShowEdit(false)} user={selectedUser} />
            <DeleteModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                user={selectedUser}
                onDelete={(user) => {
                    console.log("Deleting", user);
                    setShowDelete(false);
                }}
            />
        </div>
    );
}
