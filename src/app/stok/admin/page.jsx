import Table from '@/components/Table';

export default function stok() {

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode Barang", accessor: "kode" },
    { header: "Nama Barang", accessor: "nama" },
    { header: "Jumlah Barang", accessor: "jumlah" },
    { header: "Satuan", accessor: "satuan" },
  ];

  const data = [
    { no: 1, kode: "BRG-1234567895", nama: "Indomie", jumlah: "10",  satuan: "Karton" },
    { no: 2, kode: "BRG-1234567897", nama: "Le Minerale", jumlah: "20",  satuan: "Karton" },
    { no: 3, kode: "BRG-1234567898", nama: "Tolak Angin", jumlah: "30",  satuan: "Karton" },
    { no: 4, kode: "BRG-1234567893", nama: "Lampu Phillips", jumlah: "40", satuan: "Karton" },

  ];
  return (
  
    <div className="p-6">
      <Table 
        columns={columns}
        data={data}
        showAddButton={false}
        showAddMutasi={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        showActions={false}
        showDetailsOnly={false}
      />
            
    </div>
  );
}
