"use client";

import { useAuth } from "@/context/AuthContext";
import { authRequest } from "@/utility/auth";
import { consumeDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated && router.push("/");
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authRequest("login", { email, password });
    if (response?.token) {
      login(response.token);
    } else {
      alert(response?.meta?.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-3xl rounded-xl border-2 bg-white/70 shadow border-gray-400 flex flex-col gap-4 px-4 py-4 justify-center items-center"
        >
          <Image
            src={"/assets/images/logo.png"}
            width={200}
            height={200}
            alt="Login logo"
          />
          <h1 className="font-bold text-primary text-3xl">Smart Inventory</h1>

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Must be more than 8 characters"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>

          <button type="submit" className="w-xs btn btn-primary text-white">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
