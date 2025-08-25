"use client";

import { ReactNode } from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();

  // Define sidebar menus per role
  const menus =
    user?.role === "superadmin"
      ? [
          { label: "Overview", href: "/dashboard/superadmin" },
          { label: "Manage Properties", href: "/dashboard/superadmin/properties" },
          { label: "Users", href: "/dashboard/superadmin/users" },
        ]
      : [
          { label: "Overview", href: "/dashboard/property-admin" },
          { label: "My Properties", href: "/dashboard/property-admin/properties" },
          { label: "tenants", href: "/dashboard/property-admin/tenants" },
        ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-gray-700 rounded-lg px-3 py-2 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
