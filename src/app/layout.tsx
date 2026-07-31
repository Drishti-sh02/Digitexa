import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConsultationModalProvider } from "@/context/ConsultationModalContext";
import ConsultationModal from "@/components/ui/ConsultationModal";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digitexa | Intelligent Digital Marketing Agency",
  description: "Accelerating Brands Through Intelligent Digital Marketing. SEO, PPC, Web Design, and AI-Powered Strategies.",
  openGraph: {
    title: "Digitexa",
    description: "Accelerating Brands Through Intelligent Digital Marketing.",
    url: "https://digitexa.com",
    siteName: "Digitexa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digitexa Banner",
      }
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-white">
        <CartProvider>
          <ConsultationModalProvider>
            <SmoothScroll>
              <Navbar />
              <main className="flex-grow pt-24">
                {children}
              </main>
              <Footer />
              <ConsultationModal />
            </SmoothScroll>
          </ConsultationModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
