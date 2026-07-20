import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const devFontsPath = path.join(configDir, "src/lib/app-fonts.dev.ts");
const emptyModule = "./src/lib/challenges/empty-module.js";

/** Optional engines referenced by consolidate inside `@vue/compiler-sfc`. */
const optionalTemplateEngines = [
  "atpl",
  "bracket",
  "dot",
  "dust",
  "eco",
  "ect",
  "ejs",
  "haml",
  "haml-coffee",
  "hamlet",
  "handlebars",
  "hogan.js",
  "htmling",
  "jade",
  "jazz",
  "jqtpl",
  "just",
  "liquid",
  "liquor",
  "lodash",
  "marko",
  "mote",
  "mustache",
  "nunjucks",
  "plates",
  "pug",
  "qejs",
  "ractive",
  "razor",
  "react",
  "slm",
  "squirrelly",
  "swig",
  "teacup",
  "templayed",
  "toffee",
  "twig",
  "twing",
  "underscore",
  "vash",
  "velocityjs",
  "walrus",
  "whiskers",
] as const;

const templateEngineAliases = Object.fromEntries(
  optionalTemplateEngines.map((name) => [name, emptyModule]),
);

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(",").map((origin) => origin.trim())
  : ["localhost", "127.0.0.1"];

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins,
  serverExternalPackages: ["@vue/compiler-sfc", "vue", "@vue/test-utils"],
  turbopack: {
    resolveAlias: {
      ...(isDev ? { "@/lib/app-fonts": "./src/lib/app-fonts.dev.ts" } : {}),
      // Browser build avoids Node optional template-engine requires (atpl, twig, …).
      "@vue/compiler-sfc":
        "./node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js",
      ...templateEngineAliases,
    },
  },
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
    config.resolve.alias = {
      ...config.resolve.alias,
      ...(isDev ? { "@/lib/app-fonts": devFontsPath } : {}),
      "@vue/compiler-sfc": path.join(
        configDir,
        "node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js",
      ),
      ...Object.fromEntries(
        optionalTemplateEngines.map((name) => [
          name,
          path.join(configDir, "src/lib/challenges/empty-module.js"),
        ]),
      ),
    };

    return config;
  },
};

export default nextConfig;
