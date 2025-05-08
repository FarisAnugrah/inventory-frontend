'use client';
import { useState } from 'react';
import Table from '@/components/Table';
import DetailModal from '@/components/DetailModal';

export default function MenyetujuiBarang() {
  const [selectedItem, setSelectedItem] = useState(null);

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
    { no: 1, user: "Suci Indah", kode: "K-20", nama: "Indomie", supplier: "CV Indah", stok: "100", tanggal: "2023-03-23" },
    { no: 2, user: "Suci Indah", kode: "K-50", nama: "Le Minerale", supplier: "CV Intan", stok: "20", tanggal: "2023-03-20" },
    { no: 3, user: "Suci Indah", kode: "K-40", nama: "Tolak Angin", supplier: "CV Persada", stok: "3", tanggal: "2023-03-21" },
    { no: 4, user: "Suci Indah", kode: "K-30", nama: "Lampu Phillips", supplier: "CV Utama", stok: "40", tanggal: "2023-03-22" },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={data}
        showAddButton={false}
        showSearch={true}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        showDetailsOnly={true}
        showAddMutasi={false}

        onDetailClick={(item) => setSelectedItem(item)}
        
      />
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}