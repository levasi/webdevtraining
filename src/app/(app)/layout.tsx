import { DatabaseGate } from "@/components/layout/database-gate";

export const dynamic = "force-dynamic";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DatabaseGate>{children}</DatabaseGate>;
}
