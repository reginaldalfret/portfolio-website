import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reginaldalfret.tech";
  const updatedModified = new Date("2026-10-06T20:00:00.000Z");
  const projectModified = new Date("2026-09-18T20:00:00.000Z");

  return [
    {
      url: `${baseUrl}/`,
      lastModified: updatedModified,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: updatedModified,
    },
    {
      url: `${baseUrl}/projects/301-super-ai-agents`,
      lastModified: projectModified,
    },
    {
      url: `${baseUrl}/projects/tor-unveil`,
      lastModified: projectModified,
    },
    {
      url: `${baseUrl}/projects/ai-crop-recommendation`,
      lastModified: projectModified,
    },
  ];
}
