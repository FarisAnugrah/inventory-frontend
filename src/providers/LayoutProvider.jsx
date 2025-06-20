"use client";

import {
  Home,
  Users,
  Package,
  Boxes,
  Download,
  Upload,
  PackageCheck,
  MapPinHouse,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function LayoutProvider({ children }) {
  const { logout, user } = useAuth();
  const { count } = useNotification();
  const pathname = usePathname();
  const [menus, setMenus] = useState([]);

  const menuByRoles = {
    admin: [
      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/",
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
      { icon: <Boxes size={20} />, label: "Stok Barang", href: "/stok" },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/barangMasuk",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/barangKeluar",
      },
      // {
      //   icon: <MapPinHouse size={20} />,
      //   label: "Pengelola Gudang",
      //   href: "/pengelola-gudang",
      // },
    ],
    staff: [
      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/",
      },
      { icon: <Boxes size={20} />, label: "Stok Barang", href: "/stok" },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/barangMasuk",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/barangKeluar",
      },
    ],
    manajer: [
      {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/",
      },
      {
        icon: <Download size={20} />,
        label: "Barang Masuk",
        href: "/barangMasuk",
      },
      {
        icon: <Upload size={20} />,
        label: "Barang Keluar",
        href: "/barangKeluar",
      },
      {
        icon: <Boxes size={20} />,
        label: "Stok Barang",
        href: "/stok",
      },
      {
        icon: <PackageCheck size={20} />,
        label: "Approval Barang Keluar",
        href: "/menyetujui-barang",
      },
    ],
  };

  const getPageTitle = (path) => {
    const titles = {
      "/dashboard": "Dashboard",
      "/dashboard": "Dashboard",
      "/dashboard": "Dashboard",
      "/pengelola-pengguna": "User Management",
      "/pengelola-kategori": "Pengelola Kategori",
      "/stok": "Stok Barang",
      "/stok": "Stok Barang",
      "/barangMasuk": "Barang Masuk",
      "/barangMasuk": "Barang Masuk",
      "/barangKeluar": "Barang Keluar",
      "/barangKeluar": "Barang Keluar",
      // "/mutasiBarang": "Mutasi Barang Antar Gudang",
      "/laporanBarangMasuk": "Laporan Barang Masuk",
      "/laporanBarangKeluar": "Laporan Barang Keluar",
      "/menyetujui-barang": "Menyetujui Barang Keluar",
      // "/pengelola-gudang": "Pengelola Gudang",
      "/notifikasi": "Notifikasi",
    };
    return titles[path] || "";
  };

  const initialName = user?.name
    .match(/(^\S\S?|\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();

  useEffect(() => {
    setMenus(menuByRoles[user?.role || "admin"]);
  }, [user]);

  return (
    <>
      {!pathname.includes("/auth") ? (
        <div className="w-full flex overflow-hidden">
          {/* Sidebar */}
          <aside className="h-screen bg-[#436DA7] w-64 p-4 shrink-0">
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
              <div className="wrapper flex gap-8 items-center">
                {user?.role === "manajer" && (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle hover:bg-transparent  hover:outline-0 hover:ring-0 hover:border-0 hover:scale-110 transition-transform duration-300 ease-in-out"
                  >
                    <Link href={"/notifikasi"} className="indicator">
                      <Bell size={20} />
                      {count > 0 && (
                        <span className="badge badge-xs indicator-item bg-red-400 border-0 outline-0 rounded-full">
                          {count}
                        </span>
                      )}
                    </Link>
                  </div>
                )}
                <div className="relative group cursor-pointer">
                  <div className="bg-accent uppercase text-lg profile-wrapper rounded-full border border-white w-10 h-10 flex items-center justify-center">
                    <h1>{initialName}</h1>
                  </div>
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1  p-6 overflow-auto">
              <div className="w-full overflow-x-auto">{children}</div>
            </main>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
