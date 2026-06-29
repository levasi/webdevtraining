import { defineConfig } from "prisma/config";

import {
  getDirectDatabaseConnectionString,
  loadProjectEnv,
} from "./src/lib/database-url";

loadProjectEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDirectDatabaseConnectionString(),
  },
});
