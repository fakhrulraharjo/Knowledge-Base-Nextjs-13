const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/cms/:path*",
        destination: "http://34.128.76.220/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
