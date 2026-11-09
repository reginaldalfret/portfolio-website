/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracing: false,
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/stacks/:stack",
        destination: "/stacks/:stack/index.html",
      },
      {
        source: "/stacks/:stack/",
        destination: "/stacks/:stack/index.html",
      },
      {
        source: "/portfolio-leptos-:file*",
        destination: "/stacks/leptos/portfolio-leptos-:file*",
      },
      {
        source: "/static/portfolio/:file*",
        destination: "/:file*",
      },
    ];
  },
};

export default nextConfig;
