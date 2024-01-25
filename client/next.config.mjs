/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  distDir: "build",
};

export default nextConfig;
