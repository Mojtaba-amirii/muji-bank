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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} flex flex-col w-full min-h-screen bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="flex flex-col grow items-center justify-center px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12 relative min-h-[calc(100vh-theme(spacing.32))]">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
