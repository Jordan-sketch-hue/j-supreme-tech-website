import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "J Supreme Tech | Creative Technology & Digital Systems",
  description:
    "Premium websites, apps, CRMs, booking systems, e-commerce platforms, automations, and scalable digital infrastructure for Jamaica, the Caribbean, and worldwide.",
  keywords: [
    "J Supreme Tech",
    "Jamaica website development",
    "digital systems",
    "business automation",
    "CRM development",
    "booking systems",
    "mobile app development",
  ],
  openGraph: {
    title: "J Supreme Tech | Digital Solutions. Real Growth.",
    description:
      "Creative Technology & Digital Systems Development from Jamaica to the Caribbean and worldwide.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11161550773"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11161550773');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <Chatbot />
        <CookieConsent />
      </body>
    </html>
  );
}
