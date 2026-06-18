import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DatabaseSetupProps = {
  title?: string;
};

export function DatabaseSetup({ title = "Database not connected" }: DatabaseSetupProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            The app could not reach PostgreSQL. This page needs a running database
            with migrations and seed data applied.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Start local Postgres: <code className="text-foreground">npx prisma dev -d</code></li>
            <li>
              Set <code className="text-foreground">DIRECT_DATABASE_URL</code> in{" "}
              <code className="text-foreground">.env</code> to the{" "}
              <code className="text-foreground">postgres://</code> URL printed by that command
            </li>
            <li>
              Run <code className="text-foreground">npm run db:push</code> and{" "}
              <code className="text-foreground">npm run db:seed</code>
            </li>
            <li>Restart <code className="text-foreground">npm run dev</code></li>
          </ol>
          <p>
            For Neon or Supabase, use a standard{" "}
            <code className="text-foreground">postgresql://</code> connection string as{" "}
            <code className="text-foreground">DATABASE_URL</code>.
          </p>
          <ButtonLink href="/">Back to home</ButtonLink>
        </CardContent>
      </Card>
    </div>
  );
}
