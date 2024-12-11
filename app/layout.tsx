import "./globals.css";

import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GrantScan",
  description: "GrantScan | Indexing all grant applications ever ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
