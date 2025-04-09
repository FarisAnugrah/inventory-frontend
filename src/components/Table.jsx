export default function Table ({ management, pengelola, stok, masuk, keluar}){

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
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }