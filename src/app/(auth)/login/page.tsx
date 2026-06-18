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

export default function LoginPage() {
  const googleEnabled = isGoogleAuthEnabled();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            {googleEnabled
              ? "Continue your interview preparation journey with Google."
              : "Sign-in is temporarily unavailable on this deployment."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {googleEnabled ? (
            <GoogleSignInButton label="Sign in with Google" />
          ) : (
            <AuthUnavailableMessage />
          )}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
