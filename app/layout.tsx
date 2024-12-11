import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

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

const frame = {
  version: "next",
  imageUrl: `https://grantscan.org/og.png`,
  button: {
    title: "Open Frame",
    action: {
      type: "launch_frame",
      name: "GrantScan | Indexing all grant applications ever ",
      url: `https://grantscan.org/search/all`,
      splashImageUrl: `https://grantscan.org/splash.png`,
      splashBackgroundColor: "#020202",
    },
  },
};

export const metadata: Metadata = {
  title: "GrantScan",
  description: "Indexing all grant applications ever",
  openGraph: {
    title: "GrantScan",
    description: "Indexing all grant applications ever",
    images: [`https://grantscan.org/og.png`],
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
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
