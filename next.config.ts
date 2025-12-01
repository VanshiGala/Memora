import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: true  //allows you to write async server-side functions inside files but call them directly from the client.
  }
};

export default nextConfig;
