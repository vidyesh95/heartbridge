import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";

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
        "HeartBridge is a traditional yet modern Indian matrimonial platform. Browse verified profiles, express interest, and let our human match‑makers arrange safe offline meetings.",
    keywords: [
        "matrimonial",
        "Indian marriage",
        "arranged marriage",
        "matchmaking",
        "bride",
        "groom",
        "shaadi",
        "wedding",
        "HeartBridge",
    ],
    authors: [{name: "HeartBridge Team"}],
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
            "Discover compatible brides and grooms on HeartBridge. Verified profiles, secure payments, and personal match‑maker support.",
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
        description:
            "Browse verified Indian matrimonial profiles and let our team arrange safe introductions.",
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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            {children}
        </body>
        </html>
    );
}
