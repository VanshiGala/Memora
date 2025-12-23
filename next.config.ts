//main configuration file -> allows to customize how next.js behaves
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      }
    ]
  },
  /* config options here */
  experimental: {
    serverActions: {  //allows you to write async server-side functions inside files but call them directly from the client.
      allowedOrigins:["*"], //any domain can call
      bodySizeLimit:"2mb" //max req body size allowed for server actions
   }}
};

export default nextConfig;


