/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disable for map debugging
  //
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['cdn.weatherapi.com'],
  },
}

module.exports = nextConfig