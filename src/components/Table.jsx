'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function CustomTable(param) {
    const {
        columns = [],
        data = [],
        showAddButton = true,
        showAddMutasi = true,
        showControls = true,
        showWeekFilter = true,
        showPagination = true,
        showSearch = true,
        showActions = true,
        showDetailsOnly = false,
        entriesOptions = [5, 10, 20],
        onDetailClick = () => {},
    } = param;

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(entriesOptions?.[0] || 5);
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
        const weekStart = new Date(`${weekStr}-1`);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return date >= weekStart && date <= weekEnd;
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

    const shouldShowActionColumn = showActions || showDetailsOnly;

    return (
        <div className="w-full">
            {showControls && (
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    {showAddButton && (
                        <button onClick={handleAdd} className="btn btn-primary">Tambah</button>
                    )}
                    {showAddMutasi && (
                        <button onClick={handleAdd} className="btn btn-primary">Tambah Mutasi</button>
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
                        <div className="flex items-center gap-2 border rounded input input-bordered input-sm px-2 w-25">
                            <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);
                                }}
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
                            {shouldShowActionColumn && (
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
                                            : row[col.accessor] ?? '-'}
                                    </td>
                                ))}

                                {shouldShowActionColumn && (
                                    <td className="py-2 px-4 border-t border-r border-gray-200">
                                        <div className="flex gap-2">
                                            {showDetailsOnly ? (
                                                <button
                                                    className="btn btn-sm text-black bg-blue-200 font-normal"
                                                    onClick={() => router.push(`/detail-user/${row.id}`)}
                                                >
                                                    Detail
                                                </button>
                                            ) : (
                                                <>
                                                    {showActions && (
                                                        <>
                                                            <button
                                                                className="btn btn-sm text-white bg-red-500 font-normal"
                                                                onClick={() => handleEdit(row)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-sm text-black bg-blue-300 font-normal"
                                                                onClick={() => handleDelete(row)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                )}

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
