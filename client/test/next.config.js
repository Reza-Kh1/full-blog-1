/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["localhost"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  distDir: "build",
};

module.exports = nextConfig;
