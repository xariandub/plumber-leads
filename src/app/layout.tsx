import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhoneCTA } from "@/components/PhoneCTA";
import { Noise } from "@/components/Noise";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { business } from "@/config/business";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${business.name} — ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: `${business.name} offers fast, honest plumbing in the ${business.area}. ${business.insured}. Call ${business.phone} for emergency service or request a quote online.`,
  openGraph: {
    title: `${business.name} — ${business.tagline}`,
    description: `${business.insured}. Call ${business.phone}.`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-ink-900 text-bone-100">
        <SmoothScroll />
        <Noise />
        <Cursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PhoneCTA />
      </body>
    </html>
  );
}
