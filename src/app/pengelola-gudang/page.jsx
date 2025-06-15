import Table from '@/components/Table';

export default function pengelola_gudang() {
    const columns = [
        { header: "No", accessor: "no" },
        { header: "Nama Gudang", accessor: "nama" },
        { header: "Lokasi", accessor: "lokasi" },
    ];

    const data = [
        { no: 1, nama: "Gudang A", lokasi: "Jakarta" },
        { no: 2, nama: "Gudang A", lokasi: "Bogor" },
        { no: 3, nama: "Gudang A", lokasi: "Tangerang"},
        { no: 4, nama: "Gudang A", lokasi: "Depok" },
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
        showWeekFilter={true}
        showControls={true}
        showActions={false}
        showDetailsOnly={false}
        />

    </div>
    );
}
