import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Coach | Free Resume Review Powered by Claude AI",
  description: "Get a scored review of your resume with specific, actionable recommendations. Powered by Claude AI. Free tool by Holden Ottolini.",
  openGraph: {
    title: "AI Resume Coach | Free Resume Review",
    description: "Get a scored review of your resume with specific recommendations. Powered by Claude AI.",
    type: "website",
  },
};

export default function ResumeCoachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
