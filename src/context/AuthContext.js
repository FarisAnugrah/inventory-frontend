"use client";

import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authRequest } from "@/utility/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    initialized: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const user = JSON.parse(sessionStorage.getItem("user") || "null");

    if (token && user) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
        initialized: true,
      });

      if (pathname.startsWith("/auth")) {
        router.push("/");
      }
    } else {
      setAuthState((prev) => ({ ...prev, initialized: true }));
      
      if (!pathname.startsWith("/auth")) {
        router.push("/auth/login");
      }
    }
  }, [pathname, router]);

  const login = async (credentials) => {
    try {
      const response = await authRequest("login", credentials);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.meta?.message || "Login Gagal");
      }

      const result = await response.json();
      const { token, data: user } = result;

      setAuthState({
        isAuthenticated: true,
        user,
        token,
        initialized: true,
      });

      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Berhasil!");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan saat login");
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_APP_BASEURL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        initialized: true,
      });

      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      router.push("/auth/login");
    }
  };

  const contextValue = {
    ...authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
