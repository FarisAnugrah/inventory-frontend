"use client";

import Table from "@/components/Table";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function user() {
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  const [users, setUsers] = useState([]);
  const { token, initialized } = useAuth();

  useEffect(() => {
    if (!initialized || !token) return;

    const getUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const results = await response.json();
        setUsers(results?.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, [token, initialized, users]);

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={users}
        showSearch={true}
        showAddButton={true}
        showAddMutasi={false}
        showPagination={true}
        showWeekFilter={false}
        showControls={true}
        addLink="/tambah-user"
        editLink={`/edit-user`}
        token={token}
      />
    </div>
  );
}
