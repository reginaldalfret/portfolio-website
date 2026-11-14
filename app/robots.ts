import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        // OAI-SearchBot is OpenAI's web search crawler for ChatGPT Search answers and citations
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        // PerplexityBot is Perplexity AI's search engine crawler
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        // ClaudeBot is Anthropic's search and indexing crawler
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/stacks/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/stacks/"],
      },
    ],
    sitemap: "https://reginaldalfret.tech/sitemap.xml",
  };
}
