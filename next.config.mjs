/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
