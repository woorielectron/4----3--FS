import type { NextConfig } from "next";
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLIENT_PORT: process.env.NEXT_PUBLIC_CLIENT_PORT,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL
  },
  images: {
    domains: ['images.unsplash.com'],
  }
};

export default nextConfig;
