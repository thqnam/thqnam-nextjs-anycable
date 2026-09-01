/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/anycable/:path*",
        destination: "/api/anycable",
      },
    ];
  },
};

module.exports = nextConfig;
