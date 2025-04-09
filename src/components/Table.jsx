export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t hover:bg-blue-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4">
                  {col.accessor ? row[col.accessor] : (
                    <div className="flex gap-2">
                      <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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
  );
}
