/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  swcMinify: false, // Disable SWC minification
};

export default nextConfig;
