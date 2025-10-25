/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [],
  },
}

module.exports = nextConfig
