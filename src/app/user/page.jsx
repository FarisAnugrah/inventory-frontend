import Table from '@/components/Table';

export default function user() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama", accessor: "nama" },
    { header: "Email", accessor: "email" },
    { header: "Password", accessor: "password" },
    { header: "Role", accessor: "role" },
    { header: "Action" }, // ini untuk tombol
  ];

  const data = [
    { no: 1, nama: "Tiara Sofa", email: "111202315347@mhs.dinus.ac.id", password: "0f01ea31671ff9768b4ea3a11d5f539a",  role: "Manager" },
    { no: 2, nama: "Erma Ardelia", email: "111202315356@mhs.dinus.ac.id", password: "0f01ea31671ff9768b4ea3a11d5f539a",  role: "Admin" },
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
