import Table from '@/components/Table';

export default function barangKeluar() {
    
  <div className="flex items-center gap-2">
              <span>Show</span>
              <select className="select select-bordered select-sm w-20">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama User", accessor: "user" },
    { header: "Kode Keluar", accessor: "kode" },
    { header: "Nama Barang", accessor: "barang" },
    { header: "Nama Supplier", accessor: "supplier" },
    { header: "Stok Keluar", accessor: "stok" },
    { header: "Tanggal Keluar", accessor: "tanggal" },
  ];

  const data = [
    { no: 1, user: "Suci Indah", kode: "BRG-1234567895", barang: "Indomie", supplier: "CV Indah", stok: "100", tanggal: "2023-03-23" },
    { no: 2, user: "Suci Indah", kode: "BRG-1234567897", barang: "Le Minerale", supplier: "CV Intan", stok: "20", tanggal: "2024-02-19" },
    { no: 3, user: "Suci Indah", kode: "BRG-1234567898", barang: "Tolak Angin", supplier: "CV Persada", stok: "3", tanggal: "2025-05-20" },
    { no: 4, user: "Suci Indah", kode: "BRG-1234567893", barang: "Lampu Phillips", supplier: "CV Utama", stok: "40", tanggal: "2021-05-25" },

  ];
  return (
  
    
    <div className="p-6">
      <Table columns={columns} data={data} />
            
    </div>
  );
}
