import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AssetPathStyles } from "@/components/layout/asset-path-styles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pulse-Ops AI — Operational Intelligence Platform",
  description:
    "AI-native lifecycle operations and orchestration platform for modern SaaS organizations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AssetPathStyles />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
