import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['images.unsplash.com','res.cloudinary.com'],
  },
  experimental: {
    workerThreads: false,
  },
  webpack: (config, { dev, isServer }) => {
    // Reduce parallelism
    config.parallelism = 1;
    
    // Disable cache in problematic cases
    if (!dev) {
      config.cache = false;
    }
    
    return config;
  },
};

export default nextConfig;
