import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Finance Tracker — AI Powered",
  description: "Aplikasi pencatat keuangan dengan AI klasifikasi kategori otomatis",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-white text-black min-h-screen flex flex-col font-sans selection:bg-black/10 antialiased relative overflow-x-hidden">
        {/* Subtle grid pattern */}
        <div className="fixed inset-0 -z-10 grid-pattern opacity-30" />
        
        {/* Subtle gradient overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        
        <SessionProvider session={session}>
          {session && <Navbar />}
          <main className="pt-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
