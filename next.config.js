const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/cms/assets/:path*",
        destination: `${process.env.DIRECTUS_HOST}/assets/:path*?access_token=rHRDSi1UJ9A_xyYh2kO9dg1K-rRWynQd`,
      },
      {
        source: "/cms/:path*",
        destination: `${process.env.DIRECTUS_HOST}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
