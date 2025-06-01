"use client";
import AddMasuk from "@/components/form/staff/AddMasuk";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMasukPage() {
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState(null);
  const { initialized, token } = useAuth();

  useEffect(() => {
    if (!initialized || !token) return;

    const getIncomingItem = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_APP_BASEURL}/api/barang-masuk/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setItem(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getIncomingItem();
  }, [token, initialized]);

  return (
    <div className="p-6">
      <AddMasuk incomingItem={item} />
    </div>
  );
}
