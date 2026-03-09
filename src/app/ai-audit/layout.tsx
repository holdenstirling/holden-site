import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility & Local SEO Audit | Free Tool",
  description: "Free audit tool that scores your business across ChatGPT, Claude, Perplexity, Google AI, 8 local directories, 3 review platforms, and 6 SEO dimensions. By Holden Ottolini.",
  openGraph: {
    title: "AI Visibility & Local SEO Audit | Free Tool by Holden Ottolini",
    description: "Score your business across AI search, local directories, reviews, and SEO.",
    type: "website",
  },
};

export default function AiAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
