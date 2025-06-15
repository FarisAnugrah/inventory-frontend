"use client";

import TambahKategori from "@/components/form/admin/AddItem";
import AddUser from "@/components/form/admin/AddUser";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditItemPage() {
  const [item, setItem] = useState(null);
  const { token, initialized } = useAuth();
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    if (!initialized || !token) return;

    const getItem = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/kategori/${id}`,
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
        setItem(result);
      } catch (error) {
        console.error(error);
      }
    };

    getItem();
  }, [token, initialized]);

  return (
    <div className="p-6">
      <TambahKategori item={item} />
    </div>
  );
}

export default EditItemPage;
 