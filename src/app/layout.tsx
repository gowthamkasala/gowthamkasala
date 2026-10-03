import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";
export const metadata: Metadata = {
  ...pageMetadata(),
  alternates: undefined,
  openGraph: { ...pageMetadata().openGraph, url: undefined },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
