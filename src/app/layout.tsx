import { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muji Bank",
  description: "Your trusted financial partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col w-full min-h-screen bg-linear-to-b from-purple-500 via-purple-600 to-purple-700 text-white`}
      >
        <AuthProvider>
          <Header />
          <main className=" flex flex-col grow items-center justify-center px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
