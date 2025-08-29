import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol (e.g., 'http', 'https')
        hostname: 'placerly.onrender', // The exact hostname of the image source
      },
    ],
  },
};

export default nextConfig;
