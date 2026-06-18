import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MainFontSelect } from "@/components/admin/main-font-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMainFontLabel } from "@/lib/fonts";
import { getMainFont } from "@/lib/site-settings";

export const metadata = {
  title: "Settings",
};

export default async function AdminSettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    redirect("/categories");
  }

  const mainFont = await getMainFont();

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to admin
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Configure site-wide appearance options.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            The main font applies across the public site. Current selection:{" "}
            {getMainFontLabel(mainFont)}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MainFontSelect value={mainFont} />
        </CardContent>
      </Card>
    </div>
  );
}
