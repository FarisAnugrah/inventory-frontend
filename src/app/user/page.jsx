import Table from '@/components/Table';

export default function user() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama", accessor: "nama" },
    { header: "Role", accessor: "role" },
    { header: "Action" }, // ini untuk tombol
  ];

  const data = [
    { no: 1, nama: "Tiara", role: "Admin" },
    { no: 2, nama: "Sofa", role: "Staff" }
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
