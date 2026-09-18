import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reginaldalfret.tech";
  const lastModified = new Date("2026-09-18T20:00:00.000Z");

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
    },
    {
      url: `${baseUrl}/projects/301-super-ai-agents`,
      lastModified,
    },
    {
      url: `${baseUrl}/projects/tor-unveil`,
      lastModified,
    },
    {
      url: `${baseUrl}/projects/ai-crop-recommendation`,
      lastModified,
    },
  ];
}
