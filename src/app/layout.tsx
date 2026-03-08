import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://holdenottolini.com"),
  title: {
    default: "Holden Ottolini | Co-Founder, Solutions Architect, AI Developer",
    template: "%s | Holden Ottolini",
  },
  description:
    "Technical co-founder who built a $3.5M company from zero. 50+ Fortune 500 implementations for American Eagle, Kidde (Carrier), Aspirus Healthcare. Claude API developer. 5x Ironman finisher. Denver, CO.",
  keywords: [
    "Holden Ottolini","solutions architect","AI search consultant","enterprise implementation",
    "Claude API developer","local SEO consultant","multi location digital strategy",
    "CMS implementation","Yext expert","technical co-founder","AI visibility audit",
    "Denver consultant","React developer","Next.js developer","enterprise consulting",
    "Arc4","American Eagle developer","Carrier Global implementation",
  ],
  authors: [{ name: "Holden Stirling Ottolini" }],
  creator: "Holden Stirling Ottolini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://holdenottolini.com",
    siteName: "Holden Ottolini",
    title: "Holden Ottolini | Co-Founder, Solutions Architect, AI Developer",
    description: "Built a $3.5M company from zero. 50+ Fortune 500 implementations. Claude API developer. 5x Ironman finisher.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Holden Ottolini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holden Ottolini | Co-Founder, Solutions Architect, AI Developer",
    description: "Built a $3.5M company from zero. 50+ Fortune 500 implementations. Claude API developer. 5x Ironman finisher.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://holdenottolini.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
