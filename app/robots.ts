import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        // OAI-SearchBot is OpenAI's web search crawler for ChatGPT Search answers and citations
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
    ],
    sitemap: "https://reginaldalfret.tech/sitemap.xml",
  };
}
