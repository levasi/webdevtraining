import { DatabaseGate } from "@/components/layout/database-gate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DatabaseGate>{children}</DatabaseGate>;
}
