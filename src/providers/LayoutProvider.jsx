"use client";

import {
  Home,
  Users,
  Package,
  Boxes,
  Download,
  Upload,
  // Car,
  PackageCheck,
  MapPinHouse,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

export default function LayoutProvider({ children }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [role, setRole] = useState("admin");
  const [menus, setMenus] = useState([]);

  const menuByRoles = {
    admin: [
      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/dashboard/admin",
      },
      {
        icon: <Users size={20} />,
        label: "User Management",
        href: "/pengelola-pengguna",
      },
      {
        icon: <Package size={20} />,
        label: "Pengelola Kategori",
        href: "/pengelola-kategori",
      },
      { icon: <Boxes size={20} />,
        label: "Stok Barang", 
        href: "/stok/admin" },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/barangMasuk/admin",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/barangKeluar/admin",
      },
      {
        icon: <MapPinHouse size={20} />,
        label: "Pengelola Gudang",
        href: "/pengelola-gudang/admin",
      },
    ],
    staff: [
      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/dashboard/staff",
      },
      { icon: <Boxes size={20} />, 
        label: "Stok Barang", 
        href: "/stok/staff" },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/barangMasuk/staff",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/barangKeluar/staff",
      },
      // {
      //   icon: <Car size={20} />,
      //   label: "Mutasi Barang",
      //   href: "/mutasiBarang",
      // },
    ],
    manager: [

      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/dashboard/manager",
      },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/laporanBarangMasuk",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/laporanBarangKeluar",
      },
      { icon: <Boxes size={20} />, 
        label: "Stok Barang", 
        href: "/stok/manager" },
      {
        icon: <PackageCheck size={20} />,
        label: "Approval Barang Keluar",
        href: "/menyetujui-barang",
      },
    ],
  };

  const getPageTitle = (path) => {
    const titles = {
      "/dashboard/admin": "Dashboard",
      "/dashboard/staff": "Dashboard",
      "/dashboard/manager": "Dashboard",
      "/pengelola-pengguna": "User Management",
      "/pengelola-kategori": "Pengelola Kategori",
      "/stok/admin": "Stok Barang",
      "/stok/staff": "Stok Barang",
      "/barangMasuk/admin": "Barang Masuk",
      "/barangMasuk/staff": "Barang Masuk",
      "/barangKeluar/admin": "Barang Keluar",
      "/barangKeluar/staff": "Barang Keluar",
      // "/mutasiBarang": "Mutasi Barang Antar Gudang",
      "/laporanBarangMasuk" : "Laporan Barang Masuk",
      "/laporanBarangKeluar" : "Laporan Barang Keluar",
      "/menyetujui-barang" : "Menyetujui Barang Keluar",
      "/pengelola-gudang/admin" : "Pengelola Gudang",
    };
    return titles[path] || "Dashboard";
  };

  useEffect(() => {

    const storedRole =  "admin"; 

    setRole(storedRole);
    setMenus(menuByRoles[storedRole] || []);
  }, []);

  return (
    <AuthProvider>
      {!pathname.includes("/auth") ? (
        <div className="w-full flex overflow-hidden">
          {/* Sidebar */}
          <aside className="h-screen bg-primary w-64 p-4 shrink-0">
            <div className="flex items-center gap-2 mb-10">
              <Image
                src="/assets/images/box.png"
                width={50}
                height={50}
                alt="Logo"
              />
              <h1 className="text-lg font-bold">MY.INVENTORY</h1>
            </div>

            <nav className="flex flex-col gap-4">
              {menus.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center justify-between text-sm p-2 rounded-lg
                    ${
                      pathname === item.href
                        ? "text-[#414245]"
                        : "text-[#FFFFFF] hover:text-gray-600"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        pathname === item.href
                          ? "text-[#414245]"
                          : "text-[#B3D8F1]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="bg-red-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Konten */}
          <div className="flex flex-col h-screen w-full overflow-hidden">
            <header className="h-20 flex justify-between bg-blue-200 text-black px-6 py-4 font-semibold items-center">
              <h1 className="text-xl">{getPageTitle(pathname)}</h1>
              <div className="relative group cursor-pointer">
                <img
                  src="/assets/images/profiletest.jpg"
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                />
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                >Logout
                </button>
                </div>
              </div>
            </header>
            <main className="flex-1 bg-[var(--background)] p-6 overflow-auto">
              <div className="w-full overflow-x-auto">{children}</div>
            </main>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </AuthProvider>
  );
}
