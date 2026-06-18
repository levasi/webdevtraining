import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hasDatabaseUrl } from "@/lib/db";

type DatabaseSetupProps = {
  title?: string;
};

export function DatabaseSetup({ title = "Database not connected" }: DatabaseSetupProps) {
  const missingEnv = !hasDatabaseUrl();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {missingEnv
              ? "This deployment is missing a PostgreSQL connection string."
              : "The app could not reach PostgreSQL. The database may be empty or the connection string may be invalid."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          {missingEnv ? (
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                In Vercel, open <strong>Settings → Environment Variables</strong>
              </li>
              <li>
                Add <code className="text-foreground">DATABASE_URL</code> with a{" "}
                <code className="text-foreground">postgresql://</code> URL from Neon,
                Supabase, or Vercel Postgres
              </li>
              <li>
                Add <code className="text-foreground">BETTER_AUTH_SECRET</code>{" "}
                (random 32+ character string)
              </li>
              <li>
                Add <code className="text-foreground">BETTER_AUTH_URL</code> and{" "}
                <code className="text-foreground">NEXT_PUBLIC_APP_URL</code> set to
                your production URL
              </li>
              <li>Redeploy the project after saving env vars</li>
            </ol>
          ) : (
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Run <code className="text-foreground">npm run db:push</code> against
                your production database
              </li>
              <li>
                Run <code className="text-foreground">npm run db:seed</code> once to
                load categories, questions, and challenges
              </li>
              <li>
                Use a direct <code className="text-foreground">postgresql://</code>{" "}
                URL — not <code className="text-foreground">prisma+postgres://</code>{" "}
                — unless you also set{" "}
                <code className="text-foreground">DIRECT_DATABASE_URL</code>
              </li>
              <li>Redeploy after the schema and seed data exist</li>
            </ol>
          )}

          <p className="text-foreground">
            Local setup: start Postgres, set{" "}
            <code className="text-foreground">DATABASE_URL</code>, then run{" "}
            <code className="text-foreground">npm run db:push</code> and{" "}
            <code className="text-foreground">npm run db:seed</code>.
          </p>

          <ButtonLink href="/">Back to home</ButtonLink>
        </CardContent>
      </Card>
    </div>
  );
}
