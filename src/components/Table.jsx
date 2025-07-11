"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function CustomTable(param) {
  const {
    columns = [],
    data = [],
    showAddButton = true,
    showAddMutasi = false,
    showControls = true,
    showWeekFilter = true,
    showPagination = true,
    showSearch = true,
    showActions = true,
    removeDelete = false,
    showDetailsOnly = false,
    entriesOptions = [5, 10, 20],
    onDetailClick = () => {},
    addLink = "/tambah-user",
    editLink = "/edit-user",
    editorComponent: EditorComponent = null,
    token,
    endpoint = "users",
  } = param;

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(entriesOptions[0]);
  const [page, setPage] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const calendarRef = useRef(null);
  const fromCalendarRef = useRef(null);
  const toCalendarRef = useRef(null);

  useEffect(() => {
    import("cally").then(() => {
      if (calendarRef.current) {
        calendarRef.current.addEventListener("change", (e) => {
          setSelectedWeek(e.target.value);
          // Optionally update the button text:
          const btn = document.getElementById("cally1");
          if (btn) btn.innerText = e.target.value;
        });
      }
      if (fromCalendarRef.current) {
        fromCalendarRef.current.addEventListener("change", (e) => {
          setFromDate(e.target.value);
        });
      }
      if (toCalendarRef.current) {
        toCalendarRef.current.addEventListener("change", (e) => {
          setToDate(e.target.value);
        });
      }
    });
  }, []);

  const handleAdd = () => {
    router.push(addLink);
  };

  const handleDelete = async (item, endpoint) => {
    Swal.fire({
      title: `Yakin hapus data ${item.name || item.nama_barang || "ini"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
        }).then(async () => {
          await fetch(
            `${process.env.NEXT_APP_BASEURL}/api/${endpoint}/${item.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          window.location.reload();
        });
      }
    });
  };

  // Filter data by date range
  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    let matchesDateRange = true;
    if (fromDate) {
      matchesDateRange = new Date(row.created_at) >= new Date(fromDate);
    }
    if (toDate && matchesDateRange) {
      matchesDateRange = new Date(row.created_at) <= new Date(toDate);
    }
    return matchesSearch && matchesDateRange;
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
            <button onClick={handleAdd} className="btn btn-primary">
              Tambah
            </button>
          )}
          <div className="flex gap-4 justify-end w-full">
            {showAddMutasi && (
              <button onClick={handleAdd} className="btn btn-primary">
                Tambah Mutasi
              </button>
            )}
            {showWeekFilter && (
              <div className="flex gap-2 items-center">
                {/* From Calendar */}
                <div className="flex items-center gap-2">
                  <label className="block text-xs mb-1">From:</label>
                  <button
                    popoverTarget="cally-popover-from"
                    className="input input-border w-40"
                    id="cally-from"
                    style={{ anchorName: "--cally-from" }}
                  >
                    {fromDate ? fromDate : "Pick a date"}
                  </button>
                  <div
                    popover="true"
                    id="cally-popover-from"
                    className="dropdown bg-base-100 rounded-box shadow-lg"
                    style={{ positionAnchor: "--cally-from" }}
                  >
                    <calendar-date class="cally" ref={fromCalendarRef}>
                      <svg
                        aria-label="Previous"
                        className="fill-current size-4"
                        slot="previous"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                      </svg>
                      <svg
                        aria-label="Next"
                        className="fill-current size-4"
                        slot="next"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                      </svg>
                      <calendar-month></calendar-month>
                    </calendar-date>
                  </div>
                </div>
                {/* To Calendar */}
                <div className="flex items-center gap-2">
                  <label className="block text-xs mb-1">To: </label>
                  <button
                    popoverTarget="cally-popover-to"
                    className="input input-border w-40"
                    id="cally-to"
                    style={{ anchorName: "--cally-to" }}
                  >
                    {toDate ? toDate : "Pick a date"}
                  </button>
                  <div
                    popover="true"
                    id="cally-popover-to"
                    className="dropdown bg-base-100 rounded-box shadow-lg"
                    style={{ positionAnchor: "--cally-to" }}
                  >
                    <calendar-date class="cally" ref={toCalendarRef}>
                      <svg
                        aria-label="Previous"
                        className="fill-current size-4"
                        slot="previous"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                      </svg>
                      <svg
                        aria-label="Next"
                        className="fill-current size-4"
                        slot="next"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                      </svg>
                      <calendar-month></calendar-month>
                    </calendar-date>
                  </div>
                </div>
              </div>
            )}
            {showSearch && (
              <div className="flex items-center gap-2 border rounded input input-bordered input-sm px-2 w-36">
                <svg
                  className="h-4 w-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => {
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
                onChange={(e) => {
                  setEntries(Number(e.target.value));
                  setPage(1);
                }}
              >
                {entriesOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-sm">entries</span>
            </div>
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
                  <td
                    key={colIndex}
                    className="py-2 px-4 border-t border-r border-gray-200"
                  >
                    {col.accessor === "no"
                      ? startIndex + rowIndex + 1
                      : row[col.accessor] || col.formatter?.(row) || "-"}
                  </td>
                ))}
                {shouldShowActionColumn && (
                  <td className="py-2 px-4 border-t border-r border-gray-200">
                    <div className="flex gap-2 justify-center w-full">
                      {showDetailsOnly ? (
                        <button
                          className="btn btn-sm text-black bg-blue-200 font-normal"
                          onClick={() => onDetailClick(row)}
                        >
                          Detail
                        </button>
                      ) : (
                        <>
                          {showActions && (
                            <>
                              <Link
                                className="btn btn-sm text-white bg-red-500 font-normal"
                                href={`${editLink}/${row.id}`}
                              >
                                Edit
                              </Link>
                              {!removeDelete && (
                                <button
                                  className={`$ btn btn-sm text-black bg-blue-300 font-normal`}
                                  onClick={() => handleDelete(row, endpoint)}
                                >
                                  Delete
                                </button>
                              )}
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
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + entries, filteredData.length)} of{" "}
            {filteredData.length} entries
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
