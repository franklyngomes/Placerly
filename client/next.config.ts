import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Specify the protocol (e.g., 'http', 'https')
        hostname: 'localhost', // The exact hostname of the image source
      },
    ],
  },
};

export default nextConfig;
