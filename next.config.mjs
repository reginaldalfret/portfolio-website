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
    ];
  },
};

export default nextConfig;
