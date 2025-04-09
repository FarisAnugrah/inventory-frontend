import Table from '@/components/Table';

export default function pengelola() {
    const columns = [
        { header: "No", accessor: "no" },
        { header: "Jenis Barang", accessor: "jenis" },
        { header: "Nama Barang", accessor: "barang" },
        { header: "Action"},
    ];

    const data = [
        { no: 1, jenis: "Makanan", barang: "Indomie" },
        { no: 2, jenis: "Minuman", barang: "Le Mineral" },
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
        />

    </div>
    );
}
