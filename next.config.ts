import type { NextConfig } from "next";

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(",").map((origin) => origin.trim())
  : ["localhost", "127.0.0.1"];

const nextConfig: NextConfig = {
  allowedDevOrigins,
};

export default nextConfig;
