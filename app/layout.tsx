import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TAS PRO - Professional Home Services",
  description:
    "Professional home services with certified technicians and guaranteed quality work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>
        <Providers>
          {/* HEADER */}
          <Header />

          {/* GLOBAL CONTAINER */}
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-6 md:py-10 lg:py-[100px]">
            {children}
          </div>

          {/* FOOTER */}
          <Footer />

          {/* TOASTERS */}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
