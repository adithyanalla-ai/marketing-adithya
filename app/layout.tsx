import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const inter = localFont({ src: "./fonts/inter.woff2", variable: "--font-inter", display: "optional", weight: "100 900", preload: true });
const fraunces = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-fraunces", display: "optional", weight: "100 900", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s" },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: { types: { "application/rss+xml": `${SITE.url}/rss.xml` } },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    ...(SITE.gscVerification ? { google: SITE.gscVerification } : {}),
    ...(SITE.bingVerification ? { other: { "msvalidate.01": SITE.bingVerification } } : {}),
  },
};

export const revalidate = 3600; // ISR: static pages refresh at most hourly after a redeploy-free content change

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbfaf6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {SITE.ga4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`} strategy="lazyOnload" />
            <Script id="ga4" strategy="lazyOnload">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.ga4}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
