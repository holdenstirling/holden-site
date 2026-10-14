import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://holdenottolini.com"),
  title: {
    default: "Holden Ottolini | Solutions Architect & Advisor",
    template: "%s | Holden Ottolini",
  },
  description:
    "Senior Solutions Architect at Writer. 10+ years in enterprise pre-sales and delivery, former co-founder, 8 years at Yext. Consulting on pre-sales, platform advisory, websites, and search. 5x Ironman. Denver, CO.",
  keywords: [
    "Holden Ottolini","solutions architect","technical pre-sales","fractional solutions architect",
    "enterprise implementation","platform advisory","Microsoft Teams","Zoom","digital identity",
    "CMS implementation","local SEO consultant","Writer","Yext","Denver consultant","expert network",
  ],
  authors: [{ name: "Holden Stirling Ottolini" }],
  creator: "Holden Stirling Ottolini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://holdenottolini.com",
    siteName: "Holden Ottolini",
    title: "Holden Ottolini | Solutions Architect & Advisor",
    description: "Senior Solutions Architect at Writer. Former co-founder, 8 years at Yext, 50+ enterprise implementations. 5x Ironman finisher.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Holden Ottolini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holden Ottolini | Solutions Architect & Advisor",
    description: "Senior Solutions Architect at Writer. Former co-founder, 8 years at Yext, 50+ enterprise implementations. 5x Ironman finisher.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://holdenottolini.com" },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }], apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
