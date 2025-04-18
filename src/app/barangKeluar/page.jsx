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
    { header: "Nama Barang", accessor: "nama" },
    { header: "Nama Supplier", accessor: "supplier" },
    { header: "Stok Keluar", accessor: "stok" },
    { header: "Tanggal Keluar", accessor: "tanggal" },
  ];

  const data = [
    { no: 1, user: "Suci Indah", kode: "BRG-1234567895", nama: "Indomie", supplier: "CV Indah", stok: "100", satuan: "Karton" },
    { no: 2, user: "Suci Indah", kode: "BRG-1234567897", nama: "Le Minerale", supplier: "CV Intan", stok: "20", satuan: "Karton" },
    { no: 3, user: "Suci Indah", kode: "BRG-1234567898", nama: "Tolak Angin", supplier: "CV Persada", stok: "3", satuan: "Karton" },
    { no: 4, user: "Suci Indah", kode: "BRG-1234567893", nama: "Lampu Phillips", supplier: "CV Utama", stok: "40", satuan: "Karton" },

  ];
  return (
  
    
    <div className="p-6">
      <Table columns={columns} data={data} />
            
    </div>
  );
}
