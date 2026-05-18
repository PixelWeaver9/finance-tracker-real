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
      <body>
        <SessionProvider session={session}>
          {session && <Navbar />}
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
