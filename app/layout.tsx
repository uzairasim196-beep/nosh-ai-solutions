import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOSH AI Solutions — Intelligence Meets Creativity",
  description: "Custom AI solutions, automations, motion design, video editing, and social media marketing. Build smarter systems and a stronger brand with NOSH.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
