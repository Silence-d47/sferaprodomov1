import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  // Pro lepší SEO a Google Analytics
  poweredByHeader: false,
  compress: true,
  generateEtags: true
};

export default nextConfig;
