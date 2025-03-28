"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthCheck from "@/components/authCheck";
import Navbar from "@/components/home/Navbar";
import NavbarFarm from "@/components/home/NavbarFarm";
import NavbarAdmin from "@/components/home/NavbarAdmin";
import { useAuthStore } from "@/stores/authStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, userRole } = useAuthStore();

  let NavbarComponent = Navbar;
  if (isAuthenticated) {
    if (userRole === "farmaceutico") NavbarComponent = NavbarFarm;
    if (userRole === "admin") NavbarComponent = NavbarAdmin;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <NavbarComponent />
        <main className="pt-2">
          <AuthCheck>
            {children}
          </AuthCheck>
        </main> 
      </body>
    </html>
  );
}
