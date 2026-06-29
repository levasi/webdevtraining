import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthUnavailableMessage } from "@/components/auth/auth-unavailable-message";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { isGoogleAuthEnabled } from "@/lib/auth-providers";

export default async function RegisterPage() {
  const googleEnabled = isGoogleAuthEnabled();

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      redirect("/");
    }
  } catch {
    // Database or auth unavailable during build/local setup.
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            {googleEnabled
              ? "Sign up with Google to track your progress."
              : "Account creation is temporarily unavailable on this deployment."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {googleEnabled ? (
            <GoogleSignInButton callbackURL="/" label="Sign up with Google" />
          ) : (
            <AuthUnavailableMessage />
          )}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
