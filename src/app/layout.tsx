import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";
import { NewsletterPopup } from "@/components/newsletter/popup";
import PwaUpdate from "@/components/pwa-update";
import { VisitorTracker } from "@/components/VisitorTracker";
import { Analytics } from "@vercel/analytics/next";
import { ADS_ENABLED, ADSENSE_CLIENT } from "@/lib/ads";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
  variable: "--font-jet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jsupremetech.online"),
  title: "J Supreme Tech | Creative Technology & Digital Systems",
  description:
    "We design and ship websites, apps, CRMs, booking engines, e-commerce platforms, and full digital systems. A black-and-white studio building scalable infrastructure for Jamaica, the Caribbean, and worldwide.",
  keywords: [
    "J Supreme Tech",
    "Jamaica website development",
    "digital systems",
    "business automation",
    "CRM development",
    "booking systems",
    "mobile app development",
    "Caribbean software studio",
  ],
  openGraph: {
    title: "J Supreme Tech | Digital Solutions. Real Growth.",
    description:
      "A black-and-white technology studio shipping websites, apps, dashboards, and digital systems from Jamaica to the world.",
    type: "website",
    url: "https://jsupremetech.online",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "J Supreme Tech — Digital Solutions. Real Growth." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J Supreme Tech | Digital Solutions. Real Growth.",
    description:
      "A black-and-white technology studio shipping websites, apps, dashboards, and digital systems from Jamaica to the world.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
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

        {/* Meta Pixel (Jor Dan pixel) — powers Landing Page View optimization + retargeting
            for the blog-traffic ad campaign. afterInteractive is fine here: Meta verifies by
            detecting the fbq PageView at runtime, not by crawling a script tag. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '622840123233134');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=622840123233134&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google AdSense — literal <script> in <head> (NOT next/script afterInteractive, which
            only emits a preload link the AdSense crawler can't verify). React 19 SSRs this async
            script into the head as a real tag, matching exactly what AdSense expects. */}
        {ADS_ENABLED ? (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body suppressHydrationWarning className="bg-white text-ink-900 antialiased">
        <div aria-hidden className="cn-grain" />
        <Header />
        <VisitorTracker />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
        <CookieConsent />
        <NewsletterPopup />
        <PwaUpdate />
        <Analytics />
        <CustomCursor />
      </body>
    </html>
  );
}
