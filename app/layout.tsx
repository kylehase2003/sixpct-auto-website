import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sixpct.com"),
  title: "Six% Auto | Stop Managing Work. Start Executing It.",
  description:
    "Six% Auto is an AI-powered execution layer that removes operational friction slowing your business down. Built for businesses that actually work.",
  robots: "index, follow",
  alternates: {
    canonical: "https://sixpct.com",
  },
  openGraph: {
    title: "Six% Auto | AI Execution Layer",
    description:
      "Stop managing work. Start executing it. AI-powered automation for med spas, dental clinics, and wellness businesses.",
    url: "https://sixpct.com",
    siteName: "Six% Auto",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Six% Auto — AI Execution Layer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six% Auto | AI Execution Layer",
    description: "Stop managing work. Start executing it.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
