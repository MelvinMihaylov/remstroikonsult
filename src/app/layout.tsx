import type { Metadata } from "next";

import "./globals.css";

import { getSiteUrl, siteConfig } from "./site-config";

const siteUrl = getSiteUrl();
const logoPath = "/images/remstroi/remstroi-logo.png";
const ogImagePath = "/images/og/home.jpg";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      additionalType: "https://schema.org/HomeAndConstructionBusiness",
      name: siteConfig.name,
      url: siteUrl,
      description: siteConfig.description,
      telephone: siteConfig.phoneHref.replace("tel:", ""),
      email: siteConfig.email,
      areaServed: siteConfig.serviceArea,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${logoPath}`,
        width: 1024,
        height: 1024,
      },
      image: `${siteUrl}${logoPath}`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      inLanguage: "bg-BG",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: ogImagePath,
        width: 1920,
        height: 1200,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f2744" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="msapplication-TileColor" content="#0f2744" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </head>
      <body>{children}</body>
    </html>
  );
}
