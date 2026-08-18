import type { Metadata, Viewport } from "next";
import "./globals.css";

import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";

import Loader from "@/components/effects/Loader";
import Cursor from "@/components/effects/Cursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// The editorial italic that carries the whole visual identity.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — AI Engineer`,
    template: `%s — ${SITE_CONFIG.shortName}`,
  },
  description:
    "AI Engineer building secure agentic systems, RAG pipelines, and production ML. Multi-tenant architecture, intelligent memory, and defense-in-depth security.",
  keywords: [
    "AI Engineer",
    "Agentic AI",
    "LangGraph",
    "RAG",
    "Machine Learning",
    "Pragyan Chandra Dhar",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} — AI Engineer`,
    description:
      "Building secure, production-grade AI agents and intelligent systems.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-ink text-fg font-sans antialiased">
        <Loader />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />

        <Navbar />

        <main className="relative">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        {/* Atmosphere — always on top, never interactive */}
        <div className="vignette" aria-hidden />
        <div className="noise-overlay" aria-hidden />
      </body>
    </html>
  );
}
