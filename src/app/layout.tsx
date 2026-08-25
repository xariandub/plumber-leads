import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhoneCTA } from "@/components/PhoneCTA";
import { business } from "@/config/business";

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
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PhoneCTA />
      </body>
    </html>
  );
}
