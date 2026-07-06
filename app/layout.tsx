import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAdsTracking } from "@/components/GoogleAdsTracking";
import { AttributionTracker } from "@/components/AttributionTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Profit Factory — Revenue Streams That Work",
  description:
    "Hosting deals, viral content, AI prompts, and more. Real revenue streams, not hype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAdsTracking />
        <AttributionTracker />
        {children}
      </body>
    </html>
  );
}
