import { spawnSync } from "node:child_process";

if (process.env.DATABASE_URL || process.env.DIRECT_DATABASE_URL) {
  const result = spawnSync("npx", ["prisma", "db", "push", "--skip-generate"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
