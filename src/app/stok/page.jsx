import Table from '@/components/Table';

export default function stok() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode Barang", accessor: "kode" },
    { header: "Nama Barang", accessor: "nama" },
    { header: "Jumlah Barang", accessor: "jumlah" },
    { header: "Satuan Barang", accessor: "satuan" },
  ];

  const data = [
    { no: 1, kode: "1544548ad", nama: "Tiara", jumlah: "3", satuan: "23" },
  ];
  
  return (
    <div className="p-6">
      <Table columns={columns} data={data} />
    </div>
  );
}
