import Table from '@/components/Table';

export default function pengelola() {
    const columns = [
        { header: "No", accessor: "no" },
        { header: "Kategori Barang", accessor: "barang" },
    ];

    const data = [
        { no: 1, barang: "Makanan"},
        { no: 2, barang: "Minuman"},
        { no: 3, barang: "Elektronik"},
        { no: 4, barang: "Pakaian"},
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
        addLink="/tambah-item"
        editLink="/edit-item"
        />

    </div>
    );
}