import { MetadataRoute } from "next";
const BASE = "https://holdenottolini.com";
const slugs = ["local-landing-pages","website-architecture","ai-search-implementation","client-retention-at-scale","scaling-strategies","yext-to-arc4","ironman-business-lessons","90-days-solo-travel"];
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [{ url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
  slugs.forEach((s) => { pages.push({ url: `${BASE}/blog/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }); });
  return pages;
}
