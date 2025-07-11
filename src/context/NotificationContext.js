"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext({ count: 0, refresh: () => {} });

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const { token, initialized, user } = useAuth();

  const getNotification = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/notifikasi`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Gagal fetching notifikasi");

      const result = await response.json();
      setCount(result?.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token || !initialized || user?.role !== "manajer") return;
    getNotification();
  }, [token, initialized]);

  return (
    <NotificationContext.Provider value={{ count, refresh: getNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
