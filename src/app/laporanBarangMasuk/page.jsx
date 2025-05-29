import Table from '@/components/Table';

export default function barangMasuk() {
  

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama User", accessor: "user" },
    { header: "Kode Masuk", accessor: "kode" },
    { header: "Nama Barang", accessor: "barang" },
    { header: "Nama Supplier", accessor: "supplier" },
    { header: "Stok Masuk", accessor: "stok" },
    { header: "Tanggal Masuk", accessor: "tanggal" },
  ];

  const data = [

    { no: 1, user: "Suci Indah", kode: "BRG-1234567895", barang: "Indomie", supplier: "CV Indah", stok: "100", satuan: "Karton" , tanggal: "20-05-2025" },
    { no: 2, user: "Suci Indah", kode: "BRG-1234567897", barang: "Le Minerale", supplier: "CV Intan", stok: "20", satuan: "Karton" , tanggal: "15-05-2025" },
    { no: 3, user: "Suci Indah", kode: "BRG-1234567898", barang: "Tolak Angin", supplier: "CV Persada", stok: "3", satuan: "Karton", tanggal: "16-05-2025" },
    { no: 4, user: "Suci Indah", kode: "BRG-1234567893", barang: "Lampu Phillips", supplier: "CV Utama", stok: "40", satuan: "Karton" , tanggal: "17-05-2025"},

  ];
return (
      <div className="p-6">
          <Table
          columns={columns}
          data={data}
          showAddButton={false}
          showSearch={true}
          showActions={false}
          showPagination={true}
          showWeekFilter={false}
          showControls={true}
          showAddMutasi={false}
          />
  
      </div>
      );
  }
