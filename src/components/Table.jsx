'use client';
import { useState } from 'react';

export default function Table({
    columns = [],
    data = [],
    showAddButton = true,
    onAdd = () => {},
    showControls = true,
    showWeekFilter = true,
    showPagination = true,
    showSearch = true,
    entriesOptions = [5, 10, 25],
    defaultEntries = 5,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(defaultEntries);
    const [page, setPage] = useState(1);
    const [selectedWeek, setSelectedWeek] = useState('');

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
    const matchesWeek = selectedWeek
      ? isDateInWeek(row.tanggal, selectedWeek) 
        : true;

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
                    <button onClick={onAdd} className="btn btn-primary">
                Tambah
            </button>
            )}

          {/* Filter Minggu */}
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

        {/* Search */}
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

          {/* Show Entries */}
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
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="text-sm">entries</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="table w-full text-black"
          style={{ border: '1px solid var(--background, #EAEAEA)' }}
        >
          <thead
            style={{
              backgroundColor: 'var(--color-secondary, #B3D8F1)',
              borderBottom: '1px solid var(--background, #EAEAEA)',
            }}
            className="text-black"
          >
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="py-2 px-4"
                  style={{ borderRight: '1px solid var(--background, #EAEAEA)' }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 px-4"
                    style={{
                      borderTop: '1px solid var(--background, #EAEAEA)',
                      borderRight: '1px solid var(--background, #EAEAEA)',
                    }}
                  >
                    {col.accessor === 'no'
                      ? startIndex + rowIndex + 1
                      : col.accessor
                      ? row[col.accessor]
                      : (

                    <div className="flex gap-2">
                        <button
                            className="btn btn-sm text-white"
                            style={{ backgroundColor: '#D72F32' }}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm text-black"
                            style={{ backgroundColor: '#B3D8F1' }}
                        >
                            Delete
                        </button>
                    </div>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
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
    </div>
  );
}
