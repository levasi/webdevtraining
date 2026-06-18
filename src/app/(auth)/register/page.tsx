import Link from "next/link";

import { AuthUnavailableMessage } from "@/components/auth/auth-unavailable-message";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isGoogleAuthEnabled } from "@/lib/auth-providers";

export default function RegisterPage() {
  const googleEnabled = isGoogleAuthEnabled();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            {googleEnabled
              ? "Sign up with Google to track bookmarks, notes, and progress."
              : "Account creation is temporarily unavailable on this deployment."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {googleEnabled ? (
            <GoogleSignInButton label="Sign up with Google" />
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
