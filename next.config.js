const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/cms/:path*",
        destination: `${process.env.DIRECTUS_HOST}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
