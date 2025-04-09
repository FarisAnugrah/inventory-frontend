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

export default function LayoutProvider({ children }) {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <Users size={20} />, label: "User Management" },
    { icon: <Package size={20} />, label: "Pengelola Barang" },
    { icon: <Boxes size={20} />, label: "Stok Barang" },
    { icon: <Download size={20} />, label: "Barang Masuk" },
    { icon: <Upload size={20} />, label: "Barang Keluar" },
    { icon: <Settings size={20} />, label: "Pengaturan" },
  ];

  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("/auth") ? (
        <div className="w-full flex overflow-hidden">
          <aside className="h-screen bg-primary w-64">
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
                <div
                  key={index}
                  className="flex items-center justify-between text-sm hover:text-gray-300"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="bg-red-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          <div className="flex flex-col h-screen w-full">
            <header className="flex justify-end bg-red-500 text-white p-6 font-semibold gap-3">
              Tiara Sofa
              <img
                src="/assets/images/test.jpg"
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
