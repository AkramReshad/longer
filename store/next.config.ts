import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  devIndicators: false,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
