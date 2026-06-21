import { DatabaseGate } from "@/components/layout/database-gate";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DatabaseGate>{children}</DatabaseGate>;
}
