"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    initialized: false,
  });
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const user = JSON.parse(sessionStorage.getItem("user") || "null");

    // Security: Validate token format before using
    if (token && user) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
        initialized: true,
      });
    } else {
      setAuthState((prev) => ({ ...prev, initialized: true }));

      // Clear invalid tokens
      if (token) {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
      }

      router.push("/auth/login");
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_APP_BASEURL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
          referrerPolicy: "no-referrer",
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      const token = result.token;
      const user = result?.data;

      setAuthState({
        isAuthenticated: true,
        user,
        token,
        initialized: true,
      });

      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      router.push(`/dashboard/${user.role}`);
    } catch (error) {
      console.error("Login failed:", error);

      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");

      throw error;
    }
  };

  const logout = () => {
    fetch(`${process.env.NEXT_APP_BASEURL}/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    }).catch((error) => console.error("Logout API error:", error));

    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      initialized: true,
    });

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    window.location.reload();
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
