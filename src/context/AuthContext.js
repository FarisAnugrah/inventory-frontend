"use client";

import { authRequest } from "@/utility/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    initialized: false
  });
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const user = JSON.parse(sessionStorage.getItem("user") || null);

    if (token && user) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
        initialized: true,
      });
    } else {
      setAuthState((prev) => ({ ...prev, initialized: true }));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authRequest("login", credentials);

      setAuthState({
        isAuthenticated: true,
        user: response?.data,
        token: response?.token,
      });

      sessionStorage.setItem("access_token", response?.token);
      sessionStorage.setItem("user", JSON.stringify(response?.data));

      router.push(`/dashboard/${response?.data.role}`);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    router.push("/auth/login");
  };

  const contextValue = {
    ...authState,
    login,
    logout,
    setAuthState, // Expose setter if needed externally
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
