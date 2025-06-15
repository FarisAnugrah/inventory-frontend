import Table from '@/components/Table';

export default function barangKeluar() {
    

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama User", accessor: "user" },
    { header: "Kode Keluar", accessor: "kode" },
    { header: "Nama Barang", accessor: "barang" },
    { header: "Nama Supplier", accessor: "supplier" },
    { header: "Stok Keluar", accessor: "stok" },
    { header: "Tanggal Keluar", accessor: "tanggal" },
    { header: "Kode Transaksi", accessor: "transaksi" },
  ];

  const data = [

    { no: 1, user: "Suci", kode: "BRG-1234567895", barang: "Indomie", supplier: "CV Indah", stok: "100", tanggal: "22-06-2024", transaksi: "K-2525" },
    { no: 2, user: "Suci Indah", kode: "BRG-1234567897", barang: "Le Minerale", supplier: "CV Intan", stok: "20", tanggal: "20-05-2024" , transaksi: "K-3030" },
    { no: 3, user: "Suci Indah", kode: "BRG-1234567898", barang: "Tolak Angin", supplier: "CV Persada", stok: "3", tanggal: "14-05-2024", transaksi: "K-4040" },
    { no: 4, user: "Suci Indah", kode: "BRG-1234567893", barang: "Lampu Phillips", supplier: "CV Utama", stok: "40", tanggal: "10-05-2024", transaksi: "K-1010" },


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
