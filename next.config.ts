import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const devFontsPath = path.join(configDir, "src/lib/app-fonts.dev.ts");

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(",").map((origin) => origin.trim())
  : ["localhost", "127.0.0.1"];

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins,
  turbopack: isDev
    ? {
        resolveAlias: {
          "@/lib/app-fonts": devFontsPath,
        },
      }
    : {},
  logging: {
    incomingRequests: {
      ignore: [
        /\/_next\/static\//,
        /\/_next\/image/,
        /\/favicon\.ico$/,
        /\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/,
      ],
    },
    fetches: {
      hmrRefreshes: false,
    },
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  ...(isDev
    ? {
        experimental: {
          turbopackFileSystemCacheForDev: false,
          turbopackMemoryLimit: 512 * 1024 * 1024,
          turbopackPluginRuntimeStrategy: "workerThreads",
        },
        onDemandEntries: {
          maxInactiveAge: 60 * 1000,
          pagesBufferLength: 2,
        },
      }
    : {}),
  webpack: (config) => {
    if (isDev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/lib/app-fonts": devFontsPath,
      };
    }

    return config;
  },
};

export default nextConfig;
