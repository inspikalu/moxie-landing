import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Moxie | Trade Prediction Markets with Leverage on Solana",
  description: "The first prediction market perpetuals DEX on Solana. Trade YES/NO positions with up to 50x leverage on real-world events.",
  keywords: ["prediction markets", "perpetuals", "DEX", "Solana", "crypto trading", "leverage trading", "DeFi"],
  openGraph: {
    title: "Moxie | Prediction Market Perpetuals on Solana",
    description: "Trade prediction markets with up to 50x leverage. The future of event-based trading.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moxie | Prediction Market Perpetuals",
    description: "Trade prediction markets with up to 50x leverage on Solana",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
