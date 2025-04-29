"use client";

import {
  Home,
  Users,
  Package,
  Boxes,
  Download,
  Upload,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LayoutProvider({ children }) {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", href:"/dashboard/admin" },
    { icon: <Users size={20} />, label: "User Management", href:"/pengelola-pengguna" },
    { icon: <Package size={20} />, label: "Pengelola Barang", href:"/pengelola-kategori" },
    { icon: <Boxes size={20} />, label: "Stok Barang", href:"/stok" },
    { icon: <Download size={20} />, label: "Barang Masuk", href:"/barangMasuk" },
    { icon: <Upload size={20} />, label: "Barang Keluar", href:"/barangKeluar" },

  ];

  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("/auth") ? (
        <div className="w-full flex overflow-hidden">
         <aside className="h-screen bg-primary w-64 p-4">
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
              {menuItems.map((item, index) => (
                <Link
                key={index}
                href={item.href}
                className={`flex items-center justify-between text-sm p-2 rounded-lg
                  ${pathname === item.href
                    ? ' text-[#414245]'
                    : 'text-[#FFFFFF] hover:text-gray-600'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`${pathname === item.href ? 'text-[#414245]' : 'text-[#B3D8F1]'}`}>
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
         
          <div className="flex flex-col h-screen w-full">
            <header className="flex justify-end bg-blue-200 text-black p-6 font-semibold gap-3 items-center">
              Tiara Sofa
              <img
                src="/assets/images/profiletest.jpg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full border-1 border-white"
              />
            </header>

            <main className="flex-1 bg-[var(-background)] p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
