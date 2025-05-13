import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Khvedelidze - Portfolio",
  description: "David Khvedelidze's portfolio showcasing projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="description"
          content="David Khvedelidze's portfolio showcasing projects and skills."
        />
        <meta name="author" content="David Khvedelidze" />
        <meta
          name="keywords"
          content="David Khvedelidze, portfolio, web development, projects"
        />
        {/* No need for inline styles as they're defined in globals.css */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <PageTransition>
          <main className="px-8 pt-5 pb-safe flex-grow relative">
            {children}
          </main>
        </PageTransition>
        {/* Fixed overlay element for page transitions */}
        <div
          id="global-page-transition-overlay"
          className="page-transition-overlay"
        ></div>
      </body>
    </html>
  );
}
