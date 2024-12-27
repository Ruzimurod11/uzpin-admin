/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uzpin.uz",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.amaliymoliya.uz",
        pathname: "/media/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

export default nextConfig;
