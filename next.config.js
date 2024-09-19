/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can leave this empty or add other configurations as needed
  experimental: {
    serverActions: true,
    bodySizeLimit: '2mb', // or any size you need
  },
}

module.exports = nextConfig
