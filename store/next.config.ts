import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  devIndicators: false,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: false
  },
  // The /clinical, /performance and /pharma concept pages were removed. They
  // had already been reduced to redirects, so keep the redirects alive here for
  // any link still pointing at them.
  async redirects() {
    return ['/clinical', '/performance', '/pharma'].map((source) => ({
      source,
      destination: '/',
      permanent: true
    }));
  }
};

export default nextConfig;
