"use client";

import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Continue your interview preparation journey with Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton label="Sign in with Google" />
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
