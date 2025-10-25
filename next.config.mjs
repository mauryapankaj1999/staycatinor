/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["staycationer.ebslonserver3.com", "http://localhost:3000"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Define the supported sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 1920], // Define the supported image sizes
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thestaycationer.in",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "3089",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3089",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
