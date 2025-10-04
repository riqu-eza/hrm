import { UserProvider } from "@/app/context/UserContext";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "HRM - House Rental Management",
  description: "SaaS platform for property rental management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <UserProvider>
        
        <main className="min-h-screen p-6">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} HRM SaaS. All rights reserved.
        </footer>
        </UserProvider>
      </body>
    </html>
  );
}
