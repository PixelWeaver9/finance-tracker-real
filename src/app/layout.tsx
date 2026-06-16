import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-space",
});

export const metadata: Metadata = {
  title: "LEDGR — AI-Powered Money Management",
  description: "Aplikasi pencatat keuangan dengan AI klasifikasi kategori otomatis",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#efe9da",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="id"
      className={`${display.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>
        <SessionProvider session={session}>
          {session && <Navbar />}
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
