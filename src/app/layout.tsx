import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HeartBridge – Trusted Matrimonial Matches",
    template: "%s | HeartBridge",
  },
  description:
    "HeartBridge is a matrimonial platform for India, China, the United States, and Germany. Create a country-aware profile, browse matches, like people, and message when the interest is mutual.",
  keywords: [
    "matrimonial",
    "marriage",
    "matchmaking",
    "India",
    "China",
    "United States",
    "Germany",
    "HeartBridge",
  ],
  authors: [{ name: "HeartBridge Team" }],
  creator: "HeartBridge",
  publisher: "HeartBridge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://heartbridge.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HeartBridge – Trusted Matrimonial Matches",
    description:
      "Browse matrimonial profiles in India, China, the United States, and Germany. Like, match, and message — free.",
    url: "https://heartbridge.in",
    siteName: "HeartBridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HeartBridge – Trusted Matrimonial Matches",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeartBridge – Trusted Matrimonial Matches",
    description: "Create a profile, browse matches, and message after a mutual like.",
    images: ["/twitter-image.jpg"],
    creator: "@HeartBridge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
