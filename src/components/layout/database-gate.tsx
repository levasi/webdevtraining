import { DatabaseSetup } from "@/components/layout/database-setup";
import { isDatabaseAvailable } from "@/lib/db";

export async function DatabaseGate({ children }: { children: React.ReactNode }) {
  if (!(await isDatabaseAvailable())) {
    return <DatabaseSetup />;
  }

  return children;
}
