import Table from '@/components/Table';

export default function stok() {
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
        showAddButton={true}
        showSearch={true}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        showActions = {true}
        />
      </div>
    );
  }