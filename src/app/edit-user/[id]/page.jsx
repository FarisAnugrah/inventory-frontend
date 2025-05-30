"use client";

import TambahKategori from "@/components/form/admin/AddItem";
import AddUser from "@/components/form/admin/AddUser";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditUserPage() {
  const [user, setUser] = useState(null);
  const { token, initialized } = useAuth();
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    if (!initialized || !token) return;

    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [token, initialized]);

  return (
    <div className="p-6">
      <TambahKategori user={user} />
    </div>
  );
}

export default EditUserPage;
